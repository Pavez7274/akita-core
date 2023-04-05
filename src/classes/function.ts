import { type akitaFunction } from "./lexer";
import { object_data } from "./interpreter";

export abstract class AbstractAkitaFunction {
    type: "unknown" | "parent" = "unknown";
    abstract name: string
    abstract solve(self: akitaFunction, data: object_data): Promise<object_data>
}
export class VoidAkitaFunction extends AbstractAkitaFunction {
    override name = "undefined";
    override solve(): Promise<object_data> {
        throw new Error("void function");
    }
}