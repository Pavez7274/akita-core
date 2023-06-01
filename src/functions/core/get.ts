import { Interpreter, object_data } from "../../classes/interpreter";
import { get, invoke, isFunction, result } from "lodash";
import { akitaFunction } from "../../classes/lexer";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../classes/function";

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
	@requiredFields()
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
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
