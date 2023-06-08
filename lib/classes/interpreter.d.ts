import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { Lexer, default_lexer_options, akitaFunction } from "./lexer";
export declare type record = Record<string, unknown>;
export declare type object_data = record & {
    extra: record & {
        variables: record;
    };
    parents: string[];
    results: record;
    input: string;
    epd: unknown;
};
export declare type InterpreterOptions = {
    lexer?: typeof default_lexer_options;
};
export declare type InterpreterDebugOptions = {
    parsed_input?: boolean;
    gived_input?: boolean;
    lexer?: boolean;
    executions?: boolean;
    final?: boolean;
};
export declare class Interpreter {
    readonly options?: InterpreterOptions | undefined;
    static functions: Record<string, AbstractAkitaFunction>;
    readonly lexer: Lexer;
    constructor(options?: InterpreterOptions | undefined);
    solve_fields(data: object_data, af: akitaFunction, i?: number[], s?: number, e?: number): Promise<akitaFunction>;
    solve_field(data: object_data, af: akitaFunction, index: number): Promise<akitaFunction>;
    static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>): void;
    static load_core_functions(cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction): Promise<void>;
    static load_functions(mod: string, cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction): Promise<void>;
    resolve<T = unknown>(data: object_data, af: akitaFunction, rpr: T): void;
    solve(data: Partial<object_data>, debug?: boolean | InterpreterDebugOptions): Promise<Partial<object_data>>;
}
//# sourceMappingURL=interpreter.d.ts.map