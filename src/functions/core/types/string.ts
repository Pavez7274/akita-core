import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes/index";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:string";
	name = "string";
	@requiredFields()
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(data, self, String(self.inside));
		return data;
	}
}
