import { AkitaClient } from "./client";
import { Lexer } from "./old_lexer";
export declare type object_data = object & {
    input: string;
};
export declare class Interpreter {
    readonly input: string;
    readonly client: AkitaClient;
    functions: Record<string, ((data: object_data) => object_data)>;
    readonly lexer: Lexer;
    constructor(input: string, client: AkitaClient);
    parse(data: object_data): void;
}
//# sourceMappingURL=interpreter.d.ts.map