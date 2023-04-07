import { type akitaFunction } from "./lexer";
import { Interpreter, object_data } from "./interpreter";
export declare abstract class AbstractAkitaFunction {
    type: "unknown" | "parent";
    prototypes: Array<string>;
    abstract name: string;
    abstract solve(this: Interpreter, self: akitaFunction, data: object_data): Promise<object_data>;
}
export declare class VoidAkitaFunction extends AbstractAkitaFunction {
    name: string;
    solve(): Promise<object_data>;
}
//# sourceMappingURL=function.d.ts.map