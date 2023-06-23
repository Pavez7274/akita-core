import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes";

const AsyncFunction = async function () {
	null;
}.constructor;

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:function";
	name = "function";
	prototypes = [".async"];
	@requiredFields()
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			typeof self.prototype === "string"
				? AsyncFunction(self.fields.map(({ value }) => value))
				: new Function(...self.fields.map(({ value }) => value))
		);
		return data;
	}
}
