import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer, akitaFunction } from "./lexer";
import Util from "./util";
import { functionFields } from "./lexer";
import { isNil } from "lodash";

export type object_data = object & {
    parents: string[]
    input: string
    epd: unknown
};

export class Interpreter {
    static functions: Record<string, AbstractAkitaFunction> = {};
    public readonly lexer: Lexer;
    constructor(
        readonly input: string,
        readonly client: AkitaClient
    ) {
        this.lexer = new Lexer(input, client?.__options__?.insensitive ?? false);
        this.lexer.set_functions(Object.keys(Interpreter.functions));
    }
    static async solve_fields(data: object_data, af: akitaFunction, i?: number[], s = 0, e?: number) {
        for (let index = s; index < (<functionFields[]>af.fields).length; index++) {
            if (e === index) break;
            if (i && i.includes(index)) continue;
            af = await this.solve_field(data, af, index);
        }
        return af;
    }
    static async solve_field(data: object_data, af: akitaFunction, index: number) {
        if (isNil((<functionFields[]>af.fields)[index])) return af;
        const bass = data;
        for (const overload of (<functionFields[]>af.fields)[index].overloads) {
            data.input = (<functionFields[]>af.fields)[index].value;
            const finded = Interpreter.functions[overload.name],
                reject = await finded.solve(overload, data);
            if (reject.input) {
                (<functionFields[]>af.fields)[index].value = reject.input;
                af.inside = (<functionFields[]>af.fields).map(f => f.value).join("|");
                af.total = `${af.name}[${af.inside}]`;
            }
        }
        data.input = bass.input;
        return af;
    }
    public static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>) {
        for (const abs_based_function of abs_based_functions) {
            const t = new abs_based_function();
            Interpreter.functions[t.name] = t;
        }
    }
    public static async load_functions(mod: string) {
        for (const file of Util.get_files(mod).filter(el => el.name.endsWith(".js"))) {
            const t = new (await import(file.name) as { default: typeof VoidAkitaFunction }).default();
            Interpreter.functions[t.name] = t;
        }
    }
    public async solve(data: object_data) {
        const { input, functions_array } = this.lexer.main();
        data.parents ??= [];
        data.input = input;
        for (const af of functions_array) {
            const finded = Interpreter.functions[af.name];
            if (finded.type === "parent") data.parents.push(finded.name);
            try {
                data = await finded.solve(af, data);
            } catch (error) {
                if (data.parents.length === 0 || !data.parents.includes("@try"))
                    throw error;
                else if (data.parents.includes("@try")) {
                    data.epd = "catch";
                    data = await finded.solve(af, data);
                }
            }
            finded.type === "parent" && data.parents.pop();
            data.epd = null;
        }
        return data;
    }
}