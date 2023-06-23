import { eq, gt, gte, isEqual, lt, lte } from "lodash";
import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../../classes";

export default class extends AbstractAkitaFunction {
	name_in = "akita-core:condition";
	name = "condition";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	) {
		await this.solve_fields(data, self);
		const [operator, left, right] = self.fields;
		switch (operator.value as string) {
			case "equal":
				this.resolve(data, self, isEqual(left, right));
				break;
			case "strict equal":
				this.resolve(data, self, eq(left, right));
				break;
			case "not equal":
				this.resolve(data, self, left != right);
				break;
			case "strict not equal":
				this.resolve(data, self, left !== right);
				break;
			case "lesser":
				this.resolve(data, self, lt(left, right));
				break;
			case "lesser or equal":
				this.resolve(data, self, lte(left, right));
				break;
			case "greater":
				this.resolve(data, self, gt(left, right));
				break;
			case "greater or equal":
				this.resolve(data, self, gte(left, right));
				break;
			default:
				throw SyntaxError("Invalid operator provided in ".concat(self.total));
		}
		return data;
	}
}
