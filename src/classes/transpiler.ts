import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer } from "./lexer";
import Util from "./util";

export interface transpilerData {
    returns: { [k: string]: unknown }
    imports: string
    input: string
}

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
        const arr = this.lexer.lex();
        data.input = this.lexer.input;
        data.imports ??= "";
        data.returns ??= {};
        for (const akitaFunction of arr) {
            const finded = Transpiler.functions[akitaFunction.name];
            data = await finded.solve(akitaFunction, data);
        }
        console.log(data);
    }
}