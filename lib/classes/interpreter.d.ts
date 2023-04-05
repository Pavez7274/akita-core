import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer, akitaFunction } from "./lexer";
export declare type object_data = object & {
    parents: string[];
    input: string;
    epd: unknown;
};
export declare class Interpreter {
    readonly input: string;
    readonly client: AkitaClient;
    static functions: Record<string, AbstractAkitaFunction>;
    readonly lexer: Lexer;
    constructor(input: string, client: AkitaClient);
    static solve_fields(data: object_data, af: akitaFunction, i?: number[], s?: number, e?: number): Promise<akitaFunction>;
    static solve_field(data: object_data, af: akitaFunction, index: number): Promise<akitaFunction>;
    static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>): void;
    static load_functions(mod: string): Promise<void>;
    solve(data: object_data): Promise<object_data>;
}
//# sourceMappingURL=interpreter.d.ts.map