import { type transpilerData } from "./transpiler";
import { type akitaFunction } from "./lexer";

export abstract class AbstractAkitaFunction {
    abstract name: string
    abstract solve(self: akitaFunction, data: transpilerData): Promise<transpilerData>
}
export class VoidAkitaFunction extends AbstractAkitaFunction {
    override name = "undefined";
    override solve(): Promise<transpilerData> {
        throw new Error("void function");
    }
}