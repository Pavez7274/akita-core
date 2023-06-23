import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	Interpreter,
	object_data,
} from "../../../classes/index";
import { get, invoke, isFunction, isNil } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:number";
	name = "number";
	prototypes = [
		".POSITIVE_INFINITY",
		".NEGATIVE_INFINITY",
		".MAX_SAFE_INTEGER",
		".MIN_SAFE_INTEGER",
		".MAX_VALUE",
		".MIN_VALUE",
		".EPSILON",
		".NaN",
		".parseInt",
		".parseFloat",
		".isSafeInteger",
		".isInteger",
		".isFinite",
		".isNaN",
	];

	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		if (isNil(self.inside) || isNil(self.fields))
			this.resolve(data, self, Number);
		else {
			if (
				typeof self.prototype === "string" &&
				isFunction(get(Number, self.prototype.slice(1)))
			)
				this.resolve(
					data,
					self,
					invoke(
						Number,
						self.prototype.slice(1),
						...self.fields.map(({ value }) => value)
					)
				);
			else if (isNil(self.prototype))
				this.resolve(data, self, Number(self.inside));
			else this.resolve(data, self, get(Number, self.prototype.slice(1)));
		}
		return data;
	}
}
