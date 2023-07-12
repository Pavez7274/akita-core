import { Lexer, LexerAkitaFunction, type lexer_options } from "./lexer";
import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { Reader } from "./reader";
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
    lexer?: lexer_options;
};
export declare type InterpreterDebugOptions = {
    parsed_input?: boolean;
    gived_input?: boolean;
    lexer?: boolean;
    executions?: boolean;
    final?: boolean | {
        depth: number;
    };
};
export declare class Interpreter {
    readonly options?: InterpreterOptions | undefined;
    static functions: Array<AbstractAkitaFunction>;
    readonly reader: Reader;
    readonly lexer: Lexer;
    constructor(options?: InterpreterOptions | undefined);
    solve_fields(data: object_data, saf: LexerAkitaFunction<unknown>, i?: number[], s?: number, e?: number): Promise<LexerAkitaFunction<unknown>>;
    solve_field(data: object_data, saf: LexerAkitaFunction<unknown>, index: number): Promise<LexerAkitaFunction<unknown>>;
    static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>): void;
    static load_core_functions(cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction): Promise<void>;
    static load_functions(mod: string, cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction): Promise<void>;
    resolve<T, D extends object_data>(data: D, saf: LexerAkitaFunction<unknown>, rpr: T): void;
    solve(input: string, options: Partial<lexer_options>, data: Partial<object_data>, debug?: boolean | InterpreterDebugOptions): Promise<Partial<object_data>>;
}
//# sourceMappingURL=interpreter.d.ts.map