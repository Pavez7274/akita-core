import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes";
import { isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:if";
	name = "if";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_field(data, self, 0);
		if (self.fields[0].value) {
			this.solve_field(data, self, 1);
			this.resolve(data, self, self.fields[1].value);
		} else if (isNil(self.fields[2]?.value)) {
			this.solve_field(data, self, 2);
			this.resolve(data, self, self.fields[2].value);
		}
		return data;
	}
}
