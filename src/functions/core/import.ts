import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil, set } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "import";
	async solve(this: Interpreter, self: akitaFunction, data: object_data) {
		if (isNil(self.inside) || isNil(self.fields))
			throw new Error("$import require brackets");
		await this.solve_fields(data, self);
		const x = await import(self.fields[1].value);
		set(data.extra.variables, self.fields[0].value, x);
		this.resolve(data, self, x);
		return data;
	}
}
