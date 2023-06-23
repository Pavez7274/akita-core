import {
	AbstractAkitaFunction,
	LexerAkitaFunction,
	requiredFields,
	Interpreter,
	object_data,
} from "../../classes/index";

const REGULAR_EXPRESSION = /^\/(.+?)\/(\w*)?$/g;

export default class ReplaceAkitaFunction extends AbstractAkitaFunction {
	name_in = "akita-core:replace";
	name = "replace";
	@requiredFields(3)
	async solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: object_data
	): Promise<object_data> {
		await this.solve_fields(data, self);
		this.resolve(data, self, true);

		const [text, match, replacer] = self.fields;
		text.value = String(text.value);
		match.value = String(match.value);

		// Check if the 'match' field contains a regular expression
		if (REGULAR_EXPRESSION.test(match.value as string)) {
			const [, $1, $2] = Array.from((text.value as string).matchAll(REGULAR_EXPRESSION))[0];
			this.resolve(
				data,
				self,
				(text.value as string).replace(new RegExp($1, $2), replacer.value as string)
			);
		} else {
			this.resolve(
				data,
				self,
				(text.value as string).replace(
					match.value as string,
					replacer.value as string
				)
			);
		}

		return data;
	}
}
