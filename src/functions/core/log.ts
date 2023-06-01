import { Interpreter, object_data } from "../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";

export default class extends AbstractAkitaFunction {
	name = "log";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		console.log(...self.fields.map(({ value }) => value));
		this.resolve(data, self, "");
		return data;
	}
}
