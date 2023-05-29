import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	type = "parent" as const;
	name = "try";
	async solve(this: Interpreter, self: akitaFunction, data: object_data) {
		// usage: $try[block;catch;finally]
		let final = true;
		if (isNil(self.inside)) throw new Error("$try require brackets");
		if (data.epd === "catch") {
			await this.solve_field(data, self, 1);
			final = false;
		} else await this.solve_field(data, self, 0);
		if (self.fields && !isNil(self.fields[2]))
			await this.solve_field(data, self, 2);
		this.resolve(data, self, final);
		return data;
	}
}
