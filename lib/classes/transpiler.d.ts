import { AbstractAkitaFunction } from "./function";
import { AkitaClient } from "./client";
import { Lexer } from "./lexer";
export interface transpilerData {
    returns: {
        [k: string]: unknown;
    };
    imports: string;
    input: string;
}
export declare class Transpiler {
    readonly input: string;
    readonly client?: AkitaClient | undefined;
    static functions: Record<string, AbstractAkitaFunction>;
    readonly lexer: Lexer;
    constructor(input: string, client?: AkitaClient | undefined);
    static load_functions(mod: string): Promise<void>;
    parse(data?: transpilerData): Promise<void>;
}
//# sourceMappingURL=transpiler.d.ts.map