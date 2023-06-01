import { Interpreter, object_data } from "../../classes/interpreter";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { result } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "this";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			result(this, self.fields[0].value, self.fields[1]?.value)
		);
		return data;
	}
}
