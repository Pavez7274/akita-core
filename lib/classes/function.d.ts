import { type transpilerData } from "./transpiler";
import { type akitaFunction } from "./lexer";
export declare abstract class AbstractAkitaFunction {
    abstract name: string;
    abstract solve(self: akitaFunction, data: transpilerData): Promise<transpilerData>;
}
export declare class VoidAkitaFunction extends AbstractAkitaFunction {
    name: string;
    solve(): Promise<transpilerData>;
}
//# sourceMappingURL=function.d.ts.map