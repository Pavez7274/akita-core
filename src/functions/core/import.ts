import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import Util from "../../classes/util";
import { isNil, set } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:import";
	name = "import";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
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
