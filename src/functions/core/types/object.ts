import { Interpreter, object_data } from "../../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
import { defaults, isNil, isObjectLike } from "lodash";
import Util, { AkitaError } from "../../../classes/util";

export default class _object extends AbstractAkitaFunction {
	name = "object";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const obj = Util.parse_object(self.fields[0].value),
			def = self.fields[1] ? Util.parse_object(self.fields[1].value) : null;
		if (isNil(obj) || !isObjectLike(obj))
			throw new AkitaError("Invalid object gived in " + self.total);
		if (def !== null && !isObjectLike(obj))
			throw new AkitaError("Invalid object (default) gived in " + self.total);
		defaults(obj, def);
		this.resolve(data, self, obj);
		return data;
	}
}
