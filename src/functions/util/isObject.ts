import { Interpreter, object_data } from "../../classes/interpreter";
import { isEqual, isObjectLike, keys } from "lodash";
import { akitaFunction } from "../../classes/lexer";
import Util from "../../classes/util";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";

export default class extends AbstractAkitaFunction {
	name = "isObject";
	prototypes = [".like"];
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields" | "inside">,
		data: object_data
	): Promise<object_data> {
		await this.solve_fields(data, self);
		if (self.prototype === ".like") {
			const x = Util.parse_object(self.fields[0].value) as object,
				t = Util.parse_object(self.fields[1].value) as object;
			if (isObjectLike(x) && isObjectLike(t))
				this.resolve(data, self, isEqual(keys(x), keys(t)));
			else this.resolve(data, self, false);
		} else this.resolve(data, self, isObjectLike(Util.parse_object(self.inside)));
		return data;
	}
}
