import { isNil, toLower } from "lodash";
import { inspect } from "util";

export interface matchedFunction {
    match: string
    name: string
    pos: number
    len: number
}

export class akitaFunction {
    public total: string;
    constructor(
        public readonly name: string,
        public readonly id: string
    ) {
        this.total = id;
    }
    public after(input: string) {
        return input.slice((input.match(this.id.replace(/(\(|\))/g, "\\$1"))?.index ?? 0) + this.id.length);
    }
    public fields(input: string) {
        const fields = Lexer.lex_inside(this.after(input));
        this.total += "[" + fields.inside + "]";
        return fields;
    }
    public _fields(input: string) {
        return Lexer.lex_inside(this.after(input));
    }
}

export class Lexer {
    private regexp: RegExp | null = null;
    private functions: string[] = [];
    constructor(public input: string, private readonly insensitive = true) {
        if ("string" !== typeof input) throw new Error("Input must be a string!");
    }
    public set_functions(functions: string[]): this {
        this.functions = functions.sort((a, b) => b.length - a.length);
        this.regexp = new RegExp(`(${this.functions.map(a => a.replace("$", "\\$")).join("|")})`, this.insensitive ? "gi" : "g");
        return this;
    }
    private find_function(x: string) {
        return this.functions.find(f => toLower(f) === toLower(x));
    }
    private match(input: string): matchedFunction | null {
        if (isNil(this.regexp)) throw new Error("Expected regex value!");
        const match = input.match(this.regexp);
        return isNil(match) ? null : {
            name: this.insensitive ? this.find_function(match[0]) as string : match[0],
            pos: match.index as number,
            len: match[0].length,
            match: match[0]
        };
    }
    public static lex_inside(after: string) {
        const fields: string[] = [""];
        let escape = false,
            closed = false,
            inside = "",
            depth = 0;
        for (const char of after.slice(1)) {
            if (escape) {
                inside += char;
                escape = false;
            } else if (char === "\\") escape = true;
            else if (char === ";") {
                fields.push("");
                inside += char;
            } else if (char === "]" && depth <= 0) { closed = true; break; }
            else if (char === "[") {
                fields[fields.length - 1] += char;
                inside += char;
                depth++;
            } else if (char === "]" && depth > 0) {
                fields[fields.length - 1] += char;
                inside += char;
                depth--;
            } else {
                fields[fields.length - 1] += char;
                inside += char;
            }
        }
        if (!closed) throw new SyntaxError("Missing ]");
        return { fields, inside };
    }
    lex(debug = false) {
        const functions_array: akitaFunction[] = [];
        for (let index = 0, match = this.match(this.input); !isNil(match); match = this.match(this.input), index++) {
            if (isNil(match)) continue;
            const sysfu = new akitaFunction(match.name, `SYSTEM_FUNCTION(${index})`);
            functions_array.unshift(sysfu);
            this.input = this.input.replace(match.match, sysfu.id);
        }
        debug && console.log(this.input, "\n", inspect(functions_array, { depth: null, colors: true }));
        return functions_array;
    }
}

// TEST
// const code = "$uwu['aaaaaaaaaaaaa a'];";
// const lexer = new Lexer(code);
// lexer.set_functions(["$uwu", "$ovo"]);
// console.log(
//     lexer.lex(true)[0].after(lexer.input)
// );