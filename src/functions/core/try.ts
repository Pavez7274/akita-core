import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { isNil, noop } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:try";
	type = "parent" as const;
	name = "try";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
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
