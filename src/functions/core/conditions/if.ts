import { Interpreter, object_data } from "../../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
import { isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "if";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_field(data, self, 0);
		if (self.fields[0].value) {
			this.solve_field(data, self, 1);
			this.resolve(data, self, self.fields[1].value);
		} else if (isNil(self.fields[2]?.value)) {
			this.solve_field(data, self, 2);
			this.resolve(data, self, self.fields[2].value);
		}
		return data;
	}
}
