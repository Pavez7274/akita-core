import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../classes/function";

export default class extends AbstractAkitaFunction {
	type = "parent" as const;
	name = "try";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		// usage: $try[block;catch;finally]
		let final = true;
		if (data.epd === "catch") {
			await this.solve_field(data, self, 1);
			final = false;
		} else await this.solve_field(data, self, 0);
		if (!isNil(self.fields[2])) await this.solve_field(data, self, 2);
		this.resolve(data, self, final);
		return data;
	}
}
