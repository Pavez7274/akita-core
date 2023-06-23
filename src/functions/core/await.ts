import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:await";
	name = "await";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			await self.fields.map(async ({ value }) => await value)
		);
		return data;
	}
}
