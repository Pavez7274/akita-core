import { Interpreter, object_data } from "../../../classes/interpreter";
import { AbstractAkitaFunction } from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
import { isNil } from "lodash";

const AsyncFunction = async function () {
	null;
}.constructor;

export default class _function extends AbstractAkitaFunction {
	name = "function";
	prototypes = [".async"];
	async solve(this: Interpreter, self: akitaFunction, data: object_data) {
		if (isNil(self.inside) || isNil(self.fields))
			throw new Error("$function require brackets");
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			typeof self.prototype === "string"
				? AsyncFunction(self.fields.map(({ value }) => value))
				: new Function(...self.fields.map(({ value }) => value))
		);
		return data;
	}
}
