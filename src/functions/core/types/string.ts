import { Interpreter, object_data } from "../../../classes/interpreter";
import { AbstractAkitaFunction } from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
import { isNil } from "lodash";

export default class _string extends AbstractAkitaFunction {
	override name = "string";
	override async solve(
		this: Interpreter,
		self: akitaFunction,
		data: object_data
	) {
		if (isNil(self.inside) || isNil(self.fields))
			throw new Error("$string require brackets");
		await this.solve_fields(data, self);
		this.resolve(data, self, String(self.inside));
		return data;
	}
}
