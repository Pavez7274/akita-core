import { Interpreter, object_data } from "../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil, set } from "lodash";
import Util from "../../classes/util";

export default class extends AbstractAkitaFunction {
	name = "import";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const r = Util.parse_object(self.fields[1].value);
		if (isNil(r)) {
			const x = await import(self.fields[1].value);
			set(data.extra.variables, self.fields[0].value, x);
		} else {
			const x = await import(self.fields[1].value);
			for (const key in r) {
				set(data.extra.variables, key, x[key]);
			}
		}
		this.resolve(data, self, void 0);
		return data;
	}
}
