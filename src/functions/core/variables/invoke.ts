import { Interpreter, object_data } from "../../../classes/interpreter";
import { get, invoke, isFunction, result } from "lodash";
import { akitaFunction } from "../../../classes/lexer";
import {
	AbstractAkitaFunction,
	requiredFields,
	RequiredField,
} from "../../../classes/function";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _(object: object, key: string, ...rest: unknown[]) {
	const res = get(object, key, rest[0]);
	return isFunction(res) && rest.length > 1
		? res.apply(rest[0], rest.slice(1))
		: result(object, key, rest[0]);
}

export default class extends AbstractAkitaFunction {
	name = "invoke";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			invoke(
				data.extra.variables,
				self.fields[0].value,
				...self.fields.slice(1).map(({ value }) => value)
			)
		);
		return data;
	}
}
