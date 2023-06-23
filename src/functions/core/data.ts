import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { result } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:data";
	name = "data";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			result(data, self.fields[0].value, self.fields[1]?.value)
		);
		return data;
	}
}
