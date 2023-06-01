import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../classes/function";

export default class extends AbstractAkitaFunction {
	name = "throw";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const error = new Error(self.fields[0].value);
		isNil(self.fields[1].value) || (error.name = self.fields[1].value);
		throw error;
		return data;
	}
}
