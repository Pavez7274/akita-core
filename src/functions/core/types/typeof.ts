import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes/index";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:typeof";
	name = "typeof";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(data, self, typeof self.fields[0].value);
		return data;
	}
}
