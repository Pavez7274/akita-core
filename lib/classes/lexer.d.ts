export declare enum Operators {
    "==" = "equal",
    "===" = "strict equal",
    "!=" = "not equal",
    "!==" = "strict not equal",
    ">" = "greater",
    "<" = "lesser",
    ">=" = "greater or equal",
    "<=" = "lesser or equal",
    "=" = "assign"
}
export interface matchedFunction {
    prototype?: string;
    position: number;
    length: number;
    match: string;
    name: string;
}
export declare class LexerError extends Error {
    constructor(property: string, header: string, explain: string);
}
export declare type LexerAkitaFunctionField<T> = {
    overloads: LexerAkitaFunction<string>[];
    value: T;
};
export declare class LexerAkitaFunction<T> {
    options: lexer_options;
    matched: matchedFunction;
    readonly uid: string;
    fields: LexerAkitaFunctionField<T>[];
    constructor(options: lexer_options, matched: matchedFunction, uid: string);
    get identifier(): string;
    get position(): number;
    get name(): string;
    get prototype(): string | undefined;
    get inside(): string;
    get total(): string;
    toJSON(): {
        identifier: string;
        position: number;
        fields: LexerAkitaFunctionField<T>[];
        name: string;
    };
}
export interface lexer_options {
    insensitive: boolean;
    argument: string;
    opener: string;
    closer: string;
}
export declare class Lexer {
    default_options: Partial<lexer_options>;
    static readonly CONDITION_EXPRESSION: RegExp;
    static readonly SAF_EXPRESSION: RegExp;
    static readonly SAR_EXPRESSION: RegExp;
    regular_expression: string;
    private functions;
    constructor(default_options?: Partial<lexer_options>);
    static generateToken(): string;
    set_functions(functions: string[]): this;
    find_function(x: string): string | undefined;
    match_functions(input: string, options: lexer_options): matchedFunction[];
    inside(options: lexer_options, after: string, block: Array<LexerAkitaFunction<unknown>>): {
        fields: LexerAkitaFunctionField<string>[];
        inside: string;
        block: LexerAkitaFunction<unknown>[];
    };
    lex(input: string, options?: Partial<lexer_options>, debug?: boolean): {
        block: LexerAkitaFunction<unknown>[];
        input: string;
    };
    resolve(input: string, { opener, closer, argument }: lexer_options): string;
}
//# sourceMappingURL=lexer.d.ts.map