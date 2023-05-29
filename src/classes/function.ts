import { Interpreter, object_data } from "./interpreter";
import { type akitaFunction } from "./lexer";

export abstract class AbstractAkitaFunction {
	type: "unknown" | "parent" = "unknown";
	prototypes: Array<string> = [];
	abstract name: string;
	abstract solve(
		this: Interpreter,
		self: akitaFunction,
		data: object_data
	): Promise<object_data>;
}
export class VoidAkitaFunction extends AbstractAkitaFunction {
	override name = "undefined";
	override solve(): Promise<object_data> {
		throw new Error("void function");
	}
}
