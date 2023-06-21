import { Interpreter, object_data } from "../../classes/interpreter";
import {
	AbstractAkitaFunction,
	RequiredField,
	requiredFields,
} from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";

export default class extends AbstractAkitaFunction {
	name = "import";
	@requiredFields(2)
	async solve(
		this: Interpreter,
		self: RequiredField<akitaFunction, "fields">,
		data: object_data
	) {
		await this.solve_fields(data, self);
		this.resolve(
			data,
			self,
			await self.fields.map(async ({ value }) => await value)
		);
		return data;
	}
}
