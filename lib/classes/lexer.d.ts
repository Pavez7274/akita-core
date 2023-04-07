export interface matchedFunction {
    prototype?: string;
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
    prototype?: string;
    fields?: functionFields[];
    inside?: string;
    total: string;
    name: string;
    pos: number;
    _id: number;
    id: string;
}
export declare class Lexer {
    private readonly insensitive;
    private regexp;
    private functions;
    input: string;
    constructor(insensitive?: boolean);
    set_input(n: string): void;
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