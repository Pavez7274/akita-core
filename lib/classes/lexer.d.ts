export interface matchedFunction {
    match: string;
    name: string;
    pos: number;
    len: number;
}
export declare class akitaFunction {
    readonly name: string;
    readonly id: string;
    total: string;
    constructor(name: string, id: string);
    after(input: string): string;
    fields(input: string): {
        fields: string[];
        inside: string;
    };
    _fields(input: string): {
        fields: string[];
        inside: string;
    };
}
export declare class Lexer {
    input: string;
    private readonly insensitive;
    private regexp;
    private functions;
    constructor(input: string, insensitive?: boolean);
    set_functions(functions: string[]): this;
    private find_function;
    private match;
    static lex_inside(after: string): {
        fields: string[];
        inside: string;
    };
    lex(debug?: boolean): akitaFunction[];
}
//# sourceMappingURL=lexer.d.ts.map