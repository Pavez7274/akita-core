import { Interpreter, object_data } from "../../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
import { set } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "set";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		set(data.extra.variables, self.fields[0].value, self.fields[1].value);
		this.resolve(data, self, self.fields[1].value);
		return data;
	}
}
