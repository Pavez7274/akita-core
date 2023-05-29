import { escapeRegExp, isNil, merge, toLower } from "lodash";
import { inspect } from "util";

export interface matchedFunction {
	prototype?: string;
	match: string;
	name: string;
	pos: number;
	len: number;
}
export interface functionFields {
	overloads: akitaFunction[];
	value: string;
}
export interface akitaFunction {
	prototype?: string;
	fields?: functionFields[];
	inside?: string;
	total: string;
	name: string;
	pos: number;
	_id: number;
	id: string;
}

export const default_lexer_options: {
	insensitive?: boolean;
	argument?: string;
	opener?: string;
	closer?: string;
} = {
	insensitive: false,
	argument: ";",
	opener: "[",
	closer: "]",
};

export class Lexer {
	private options = default_lexer_options;
	private regexp: RegExp | null = null;
	private functions: string[] = [];
	public input = "";
	constructor(options?: typeof default_lexer_options) {
		merge(this.options, options);
	}
	public set_input(n: string) {
		this.input = n;
	}
	public set_functions(functions: string[]): this {
		this.functions = functions.sort((a, b) => b.length - a.length);
		this.regexp = new RegExp(
			`(${this.functions.map(escapeRegExp).join("|")})(\\.[A-z_]+)?`,
			this.options.insensitive ? "gi" : "g"
		);
		console.log(this.regexp);
		return this;
	}
	private find_function(x: string) {
		return this.functions.find((f) => toLower(f) === toLower(x));
	}
	private match_functions(): matchedFunction[] {
		if (isNil(this.regexp)) throw new Error("Expected regex value!");
		const maches = this.input.matchAll(this.regexp),
			result: matchedFunction[] = [];
		for (let i = maches.next(); !isNil(i); i = maches.next()) {
			if (i.done) break;
			result.push({
				name: this.options.insensitive
					? (this.find_function(i.value[1]) as string)
					: i.value[1],
				pos: i.value.index as number,
				len: i.value[0].length,
				match: i.value[0],
				prototype: i.value[2],
			});
		}
		return result;
	}
	public lex_inside(after: string, functions_array: Array<akitaFunction>) {
		const fields: functionFields[] = [{ value: "", overloads: [] }];
		let escape = false,
			closed = false,
			inside = "",
			depth = 0;
		for (const char of after.slice(1)) {
			if (escape) {
				inside += char;
				escape = false;
			} else if (char === "\\") escape = true;
			else if (char === this.options.argument) {
				fields.push({ value: "", overloads: [] });
				inside += char;
			} else if (char === this.options.closer && depth <= 0) {
				closed = true;
				break;
			} else if (char === this.options.opener) {
				fields[fields.length - 1].value += char;
				inside += char;
				depth++;
			} else if (char === this.options.closer && depth > 0) {
				fields[fields.length - 1].value += char;
				inside += char;
				depth--;
			} else {
				fields[fields.length - 1].value += char;
				inside += char;
			}
		}
		for (let index = 0; index < fields.length; index++) {
			const possible_functions = fields[index].value.match(
				/SYSTEM_FUNCTION\(\d+\)/g
			);
			if (possible_functions?.length) {
				for (const possible_function of possible_functions) {
					const pos = functions_array.findIndex((n) => n.id === possible_function);
					if (pos !== -1) {
						fields[index].overloads.push(functions_array[pos]);
						functions_array.splice(pos, 1);
					}
				}
			}
		}
		if (!closed) throw new SyntaxError("Missing " + this.options.closer);
		return { fields, inside, functions_array };
	}
	main(debug = false) {
		const maches = this.match_functions(),
			block: Array<akitaFunction> = [];
		let input = this.input;
		for (let index = maches.length - 1; index >= 0; index--) {
			const match = maches[index],
				akitaFunction: akitaFunction = {
					id: `SYSTEM_FUNCTION(${index})`,
					prototype: match.prototype,
					total: match.match,
					name: match.name,
					pos: match.pos,
					_id: index,
				},
				after = input.slice(match.pos + match.len);
			if (after.charAt(0) === this.options.opener) {
				const { fields, inside } = this.lex_inside(after, block);
				akitaFunction.total += this.options.opener + inside + this.options.closer;
				akitaFunction.inside = inside;
				akitaFunction.fields = fields;
			}
			block.unshift(akitaFunction);
			input =
				input.slice(0, match.pos) +
				akitaFunction.id +
				input.slice(match.pos + akitaFunction.total.length);
		}
		debug && console.log(inspect(block, { depth: null, colors: true }));
		return { functions_array: block, input };
	}
}
