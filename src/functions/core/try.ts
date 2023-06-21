import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { isNil, noop } from "lodash";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../classes/function";

export default class extends AbstractAkitaFunction {
	type = "parent" as const;
	name_in = "akita-core:try";
	name = "try";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		// usage: @try[block;catch;finally]
		let final = await this.solve_field(data, self, 0).catch(noop);
		if (data.epd === "akita-core:catch")
			final = await this.solve_field(data, self, 1);
		if (!isNil(self.fields[2])) await this.solve_field(data, self, 2);
		this.resolve(data, self, final);
		return data;
	}
}
