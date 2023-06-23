import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { setTimeout } from "timers/promises";
import { noop } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:sleep";
	name = "sleep";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	): Promise<object_data> {
		await this.solve_fields(data, self);
		await setTimeout(Number(self.fields[0].value), noop);
		this.resolve(data, self, true);
		return data;
	}
}
