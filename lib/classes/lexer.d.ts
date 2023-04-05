export interface matchedFunction {
    match: string;
    name: string;
    pos: number;
    len: number;
}
export interface functionFields {
    overloads: akitaFunction[];
    value: string;
}
export interface akitaFunction {
    fields?: functionFields[];
    inside?: string;
    total: string;
    name: string;
    pos: number;
    id: string;
}
export declare class Lexer {
    input: string;
    private readonly insensitive;
    private regexp;
    private functions;
    constructor(input: string, insensitive?: boolean);
    set_functions(functions: string[]): this;
    private find_function;
    private match_functions;
    static lex_inside(after: string, functions_array: Array<akitaFunction>): {
        fields: functionFields[];
        inside: string;
        functions_array: akitaFunction[];
    };
    main(debug?: boolean): {
        functions_array: akitaFunction[];
        input: string;
    };
}
//# sourceMappingURL=lexer.d.ts.map