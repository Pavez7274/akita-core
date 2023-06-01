import { Interpreter, object_data } from "../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { set } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "import";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const x = await import(self.fields[1].value);
		set(data.extra.variables, self.fields[0].value, x);
		this.resolve(data, self, x);
		return data;
	}
}
