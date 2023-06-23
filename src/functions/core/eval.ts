import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:eval";
	name = "eval";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(data, self, eval(self.fields[0].value));
		return data;
	}
}
