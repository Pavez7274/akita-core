import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	Interpreter,
	object_data,
} from "../../../classes/index";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:null";
	name = "null";
	async solve(this: Interpreter, self: LexerAkitaFunction<null>, data: object_data) {
		if (self.fields) await this.solve_fields(data, self);
		this.resolve(data, self, null);
		return data;
	}
}
