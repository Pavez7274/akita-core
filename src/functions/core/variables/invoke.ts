import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes/index";
import { get, invoke, isFunction, result } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _(object: object, key: string, ...rest: unknown[]) {
	const res = get(object, key, rest[0]);
	return isFunction(res) && rest.length > 1
		? res.apply(rest[0], rest.slice(1))
		: result(object, key, rest[0]);
}

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:invoke";
	name = "invoke";
	@requiredFields(1)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
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
