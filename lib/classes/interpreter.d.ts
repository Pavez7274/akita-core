import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer, akitaFunction } from "./lexer";
export declare type obj = Record<string, unknown>;
export declare type object_data = obj & {
    extra: Record<string, unknown> & {
        variables: obj;
    };
    parents: string[];
    input: string;
    epd: unknown;
    results: obj;
};
export declare class Interpreter {
    readonly client: AkitaClient;
    static functions: Record<string, AbstractAkitaFunction>;
    readonly lexer: Lexer;
    constructor(client: AkitaClient);
    solve_fields(data: object_data, af: akitaFunction, i?: number[], s?: number, e?: number): Promise<akitaFunction>;
    solve_field(data: object_data, af: akitaFunction, index: number): Promise<akitaFunction>;
    static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>): void;
    static load_functions(mod: string): Promise<void>;
    resolve(data: object_data, af: akitaFunction, rpr: unknown): void;
    solve(data: object_data, debug?: boolean): Promise<object_data>;
}
//# sourceMappingURL=interpreter.d.ts.map