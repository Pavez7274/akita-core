import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { setTimeout } from "timers/promises";
import { noop } from "lodash";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";

export default class extends AbstractAkitaFunction {
	name = "sleep";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	): Promise<object_data> {
		await this.solve_fields(data, self);
		await setTimeout(Number(self.fields[0].value), noop);
		this.resolve(data, self, true);
		return data;
	}
}
