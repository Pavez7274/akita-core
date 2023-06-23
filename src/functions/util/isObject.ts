import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";
import Util from "../../classes/util";
import { isEqual, isObjectLike, keys } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:is_object";
	name = "isObject";
	prototypes = [".like"];
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	): Promise<object_data> {
		await this.solve_fields(data, self);
		if (self.prototype === ".like") {
			const x = Util.parse_object(self.fields[0].value as string) as object,
				t = Util.parse_object(self.fields[1].value as string) as object;
			if (isObjectLike(x) && isObjectLike(t))
				this.resolve(data, self, isEqual(keys(x), keys(t)));
			else this.resolve(data, self, false);
		} else this.resolve(data, self, isObjectLike(Util.parse_object(self.inside)));
		return data;
	}
}
