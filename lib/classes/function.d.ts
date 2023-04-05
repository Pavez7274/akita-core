import { type akitaFunction } from "./lexer";
import { object_data } from "./interpreter";
export declare abstract class AbstractAkitaFunction {
    type: "unknown" | "parent";
    abstract name: string;
    abstract solve(self: akitaFunction, data: object_data): Promise<object_data>;
}
export declare class VoidAkitaFunction extends AbstractAkitaFunction {
    name: string;
    solve(): Promise<object_data>;
}
//# sourceMappingURL=function.d.ts.map