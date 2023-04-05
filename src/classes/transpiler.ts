// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer } from "./lexer";
import Util from "./util";

export interface transpilerData {
    returns: { [k: string]: string }
    imports: string
    input: string
}

/**
 * @deprecated
 */
export class Transpiler {
    static functions: Record<string, AbstractAkitaFunction> = {};
    public readonly lexer: Lexer;
    constructor(
        readonly input: string,
        readonly client?: AkitaClient
    ) {
        this.lexer = new Lexer(this.input, client?.__options__.insensitive);
        this.lexer.set_functions(Object.keys(Transpiler.functions));
    }
    public static async load_functions(mod: string) {
        for (const file of Util.get_files(mod).filter(el => el.name.endsWith(".js"))) {
            const t = new (await import(file.name) as { default: typeof VoidAkitaFunction }).default();
            Transpiler.functions[t.name] = t;
        }
    }
    public async parse(data: transpilerData = { input: this.input, imports: "", returns: {} }) {
        console.log("[ DEBUG ] Provided code:", data.input ?? this.input);
        const { functions_array } = this.lexer.main();
        data.input = this.lexer.input;
        data.imports ??= "";
        data.returns ??= {};
        for (const akitaFunction of functions_array) {
            const finded = Transpiler.functions[akitaFunction.name];
            data = await finded.solve(akitaFunction, data);
        }
        console.log(data);
        return data.imports.concat("\n",
            data.input.replace(/SYSTEM_RESULT\("(.*?)"\)/g, (a, m) => data.returns[m] || a)
        );
    }
}