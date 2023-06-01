import { Interpreter, object_data } from "../../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";

const AsyncFunction = async function () {
	null;
}.constructor;

export default class _function extends AbstractAkitaFunction {
	name = "function";
	prototypes = [".async"];
	@requiredFields()
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
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
