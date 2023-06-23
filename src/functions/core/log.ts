import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { inspect } from "util";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:log";
	name = "log";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		console.log(
			...self.fields.map(({ value }) => inspect(value, { depth: null }))
		);
		this.resolve(data, self, "");
		return data;
	}
}
