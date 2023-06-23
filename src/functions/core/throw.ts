import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import { isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:throw";
	name = "throw";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const error = new Error(self.fields[0].value as string);
		isNil(self.fields[1]?.value) || (error.name = self.fields[1].value as string);
		throw error;
		// simplemente para evitar errores
		return data;
	}
}
