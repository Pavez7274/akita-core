import { isNil, toLower } from "lodash";
import { inspect } from "util";

export interface matchedFunction {
    match: string
    name: string
    pos: number
    len: number
}
export interface functionFields {
    overloads: akitaFunction[]
    value: string
}
export interface akitaFunction {
    fields?: functionFields[]
    inside?: string
    total: string
    name: string
    pos: number
    id: string
}

export class Lexer {
    private regexp: RegExp | null = null;
    private functions: string[] = [];
    public input = "";
    constructor(private readonly insensitive = true) { }
    public set_input(n: string) {
        this.input = n;
    }
    public set_functions(functions: string[]): this {
        this.functions = functions.sort((a, b) => b.length - a.length);
        this.regexp = new RegExp(`(${this.functions.join("|")})`, this.insensitive ? "gi" : "g");
        return this;
    }
    private find_function(x: string) {
        return this.functions.find(f => toLower(f) === toLower(x));
    }
    private match_functions(): matchedFunction[] {
        if (isNil(this.regexp)) throw new Error("Expected regex value!");
        const maches = this.input.matchAll(this.regexp),
            result: matchedFunction[] = [];
        for (let i = maches.next(); !isNil(i); i = maches.next()) {
            if (i.done) break;
            result.push({
                name: this.insensitive ? this.find_function(i.value[0]) as string : i.value[0],
                pos: i.value.index as number,
                len: i.value[0].length,
                match: i.value[0]
            });
        }
        return result;
    }
    public static lex_inside(after: string, functions_array: Array<akitaFunction>) {
        const fields: functionFields[] = [{ value: "", overloads: [] }];
        let escape = false,
            closed = false,
            inside = "",
            depth = 0;
        for (const char of after.slice(1)) {
            if (escape) {
                inside += char;
                escape = false;
            } else if (char === "\\") escape = true;
            else if (char === "|") {
                fields.push({ value: "", overloads: [] });
                inside += char;
            } else if (char === ")" && depth <= 0) { closed = true; break; }
            else if (char === "(") {
                fields[fields.length - 1].value += char;
                inside += char;
                depth++;
            } else if (char === ")" && depth > 0) {
                fields[fields.length - 1].value += char;
                inside += char;
                depth--;
            } else {
                fields[fields.length - 1].value += char;
                inside += char;
            }
        }
        for (let index = 0; index < fields.length; index++) {
            const possible_functions = fields[index].value.match(/SYSTEM_FUNCTION\(\d+\)/g);
            if (possible_functions?.length) {
                for (const possible_function of possible_functions) {
                    const pos = functions_array.findIndex(n => n.id === possible_function);
                    if (pos !== -1) {
                        fields[index].overloads.push(functions_array[pos]);
                        functions_array.splice(pos, 1);
                    }
                }
            }
        }
        if (!closed) throw new SyntaxError("Missing )");
        return { fields, inside, functions_array };
    }
    main(debug = false) {
        const maches = this.match_functions(), block: Array<akitaFunction> = [];
        let input = this.input;
        for (let index = maches.length - 1; index >= 0; index--) {
            const match = maches[index],
                akitaFunction: akitaFunction = {
                    id: `SYSTEM_FUNCTION(${index})`,
                    total: match.name,
                    name: match.name,
                    pos: match.pos
                },
                after = input.slice(match.pos + match.len);
            if (after.charAt(0) === "(") {
                const { fields, inside } = Lexer.lex_inside(after, block);
                akitaFunction.total += `(${inside})`;
                akitaFunction.inside = inside;
                akitaFunction.fields = fields;
            }
            block.unshift(akitaFunction);
            input = input.slice(0, match.pos) + akitaFunction.id + input.slice(match.pos + akitaFunction.total.length);
        }
        debug && console.log(inspect(block, { depth: null, colors: true }));
        return { functions_array: block, input };
    }
}
// new Lexer("$uwu[$ovo[$ovo];123;$ovo]").set_functions(["$uwu", "$ovo"]).main(true);