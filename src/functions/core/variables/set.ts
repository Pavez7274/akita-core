import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes/index";
import { set } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:set";
	name = "set";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		set(data.extra.variables, self.fields[0].value, self.fields[1].value);
		this.resolve(data, self, self.fields[1].value);
		return data;
	}
}
