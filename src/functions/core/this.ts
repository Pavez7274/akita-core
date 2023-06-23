import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { result } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:this";
	name = "this";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			result(this, self.fields[0].value as string, self.fields[1]?.value)
		);
		return data;
	}
}
