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
		const [key, mod] = self.fields.map(({ value }) => value);
		const r = Util.parse_object(key);
		const imported = mod.endsWith(".akita")
			? await this.reader.run_file(mod)
			: await import(mod);
		if (isNil(r)) {
			set(data.extra.variables, key, imported);
		} else {
			for (const prop in r) {
				set(data.extra.variables, prop, imported[key]);
			}
		}
		this.resolve(data, self, void 0);
		return data;
	}
}
