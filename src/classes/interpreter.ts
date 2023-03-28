import { AkitaClient } from "./client";
import { Lexer } from "./lexer";

type object_data = object & { input: string };

export class Interpreter {
    public functions: Record<string, ((data: object_data) => object_data)> = {};
    public readonly lexer: Lexer;
    constructor(
        readonly input: string,
        readonly client: AkitaClient
    ) {
        this.lexer = new Lexer(input, client.__options__.insensitive);
    }
    // unsolved data for now
    public parse(data: object_data) {
        const { input, functions_array } = this.lexer.main();
        data.input = input;
        for (const akitaFunction of functions_array) {
            data = this.functions[akitaFunction.name].apply(this, [data]);
        }
    }
}