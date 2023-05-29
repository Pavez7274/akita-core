import { get, invoke, isFunction, isNil, result } from "lodash";
import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _(object: object, key: string, ...rest: unknown[]) {
	const res = get(object, key, rest[0]);
	return isFunction(res) && rest.length > 1
		? res.apply(rest[0], rest.slice(1))
		: result(object, key, rest[0]);
}

export default class extends AbstractAkitaFunction {
	name = "get";
	prototypes: string[] = [".strict", ".invoke"];
	async solve(this: Interpreter, self: akitaFunction, data: object_data) {
		if (isNil(self.inside) || isNil(self.fields))
			throw new Error("$get require brackets");
		await this.solve_fields(data, self);
		if (self.prototype === ".strict")
			this.resolve(
				data,
				self,
				get(data.extra.variables, self.fields[0].value, self.fields[1]?.value)
			);
		else if (self.prototype === ".invoke")
			this.resolve(
				data,
				self,
				invoke(
					data.extra.variables,
					self.fields[0].value,
					...self.fields.slice(1).map(({ value }) => value)
				)
			);
		else
			this.resolve(
				data,
				self,
				_(
					data.extra.variables,
					self.fields[0].value,
					...self.fields.slice(1).map(({ value }) => value)
				)
			);
		return data;
	}
}
