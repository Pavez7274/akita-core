import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	Interpreter,
	object_data,
} from "../../../classes/index";
import Util, { AkitaError } from "../../../classes/util";
import { defaults, isEmpty, isNil, isObjectLike } from "lodash";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:object";
	name = "object";
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<string>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		if (isEmpty(self.fields)) {
			this.resolve(data, self, {});
			return data;
		}
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
