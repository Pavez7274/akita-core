import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	name = "throw";
	async solve(this: Interpreter, self: akitaFunction, data: object_data) {
		if (isNil(self.inside) || isNil(self.fields))
			throw new Error("$throw require brackets");
		await this.solve_fields(data, self);
		const error = new Error(self.fields[0].value);
		isNil(self.fields[1].value) || (error.name = self.fields[1].value);
		throw error;
		return data;
	}
}
