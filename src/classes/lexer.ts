import { escapeRegExp, isEmpty, isNil, merge, toLower } from "lodash";
import { inspect } from "util";

/**
 * Represents a matched function.
 */
export interface matchedFunction {
	prototype?: string;
	position: number;
	length: number;
	match: string;
	name: string;
}

export class LexerError extends Error {
	constructor(property: string, header: string, explain: string) {
		super(
			`\x1b[34m[Lexer.${property}]\x1b[0m-> \x1b[31m${header}\n\t\x1b[90m${explain}\x1b[0m`
		);
		this.name = "LexerError";
	}
}

export type LexerAkitaFunctionField<T> = {
	overloads: LexerAkitaFunction<string>[];
	value: T;
};
export class LexerAkitaFunction<T> {
	/**
	 * Array of objects representing fields with overloads and a value.
	 * @type {LexerAkitaFunctionField<T>[]}
	 */
	public fields: LexerAkitaFunctionField<T>[] = [];

	/**
	 * Creates an instance of the constructor.
	 * @param {lexer_options} options - The lexer options.
	 * @param {matchedFunction} matched - The matched function.
	 * @param {string} uid - The unique identifier.
	 * @constructor
	 */
	constructor(
		public options: lexer_options,
		public matched: matchedFunction,
		public readonly uid: string
	) {}

	/**
	 * Gets the function identifier.
	 */
	public get identifier(): string {
		return `SAF(${this.uid})`;
	}

	/**
	 * Gets the match index/position.
	 * @returns {number}
	 */
	public get position(): number {
		return this.matched.position;
	}

	/**
	 * Gets the name of the function.
	 * @returns {string}
	 */
	public get name(): string {
		return this.matched.name;
	}

	/**
	 * Gets the prototype of the function.
	 * @returns {string | undefined}
	 */
	public get prototype(): string | undefined {
		return this.matched.prototype;
	}

	/**
	 * Gets the "inside" of the function.
	 * @example
	 * // function: some(hi;bye)
	 * console.log(<AkitaFunction>.fields);
	 * // [{ overloads: [], value: "hi" }, { overloads: [], value: "bye" }]
	 * console.log(<AkitaFunction>.inside);
	 * // hi;bye
	 * @returns {string}
	 */
	public get inside(): string {
		return this.fields.map((n) => n.value).join(this.options.argument);
	}

	/**
	 * Gets the total function (name + prototype + fields).
	 * @returns {string}
	 */
	public get total(): string {
		return this.matched.name.concat(
			this.matched.prototype ?? "",
			this.inside
				? this.options.opener.concat(this.inside, this.options.closer)
				: ""
		);
	}

	public toJSON() {
		return {
			identifier: this.identifier,
			position: this.position,
			fields: this.fields.map((saf) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				saf.overloads = saf.overloads.map((_) => _.toJSON());
				return saf;
			}),
			name: this.name,
		};
	}
}

/**
 * Options for the lexer.
 */
export interface lexer_options {
	insensitive: boolean;
	argument: string;
	opener: string;
	closer: string;
}

export class Lexer {
	/**
	 *
	 */
	static readonly CONDITION_EXPRESSION =
		/([^()\s;]+(\([^)]*\))?)(\s*([=!<>]+)\s*)([^()\s;]+(\([^)]*\))?)/g;

	/**
	 * Regular expression pattern for SAF expressions.
	 * Matches the format "SAF(x)" where 'x' is a 15-character alphanumeric string.
	 * Note: This expression is case-sensitive.
	 */
	static readonly SAF_EXPRESSION = /^SAF\([a-z0-9]{15}\)$/g;

	/**
	 * Regular expression pattern for SAF expressions.
	 * Matches the format "SAF(x)" where 'x' is a 15-character alphanumeric string.
	 * Note: This expression is case-sensitive.
	 */
	static readonly SAR_EXPRESSION = /^SAR\([a-z0-9]{15}\)$/g;

	/**
	 * Regular expression used to find functions.
	 * @type {string}
	 */
	public regular_expression = "";

	/**
	 * Array that stores the names of the functions that can be found.
	 * @type {string[]}
	 * @private
	 */
	private functions: string[] = [];

	constructor(
		public default_options: Partial<lexer_options> = {
			insensitive: false,
			argument: ";",
			opener: "(",
			closer: ")",
		}
	) {}

	/**
	 * Generates a unique token composed of a timestamp and random characters.
	 * @returns {string} The generated token.
	 * @static
	 */
	static generateToken(): string {
		const timestamp = Date.now().toString(36),
			random = Math.random().toString(36).substring(2, 9),
			token = timestamp + random;
		return token;
	}

	/**
	 * Sets the array of function names and updates the regular expression accordingly.
	 * @param {string[]} functions - An array of function names.
	 * @returns {this} The instance of the current lexer.
	 */
	public set_functions(functions: string[]): this {
		this.functions = functions.sort((a, b) => b.length - a.length);
		this.regular_expression = `(${this.functions
			.map(escapeRegExp)
			.join("|")})(\\.[a-zA-Z]+)?`;
		return this;
	}

	/**
	 * Finds a function in the array of function names, ignoring case sensitivity.
	 * @param {string} x - The function name to search for.
	 * @returns {string | undefined} The matching function name, or undefined if not found.
	 */
	public find_function(x: string): string | undefined {
		return this.functions.find((f) => toLower(f) === toLower(x));
	}

	/**
	 * Matches functions in the input string based on the provided regular expression and options.
	 * @param {string} input - The input string to search for function matches.
	 * @param {lexer_options} options - The options for the lexer, including case sensitivity.
	 * @throws {Error} Throws an error if the regular expression value is not set.
	 * @returns {matchedFunction[]} An array of matchedFunction objects representing the matched functions.
	 */
	public match_functions(
		input: string,
		options: lexer_options
	): matchedFunction[] {
		if (isNil(this.regular_expression) || isEmpty(this.regular_expression))
			throw new LexerError(
				"match_functions",
				"Expected regular expression value!",
				"The Lexer expected a value for the regular expression (Lexer.regular_expression) but instead an empty string or a falsy value was provided"
			);
		const insensitive = options.insensitive ?? this.default_options;
		return Array.from(
			input.matchAll(
				new RegExp(this.regular_expression, insensitive ? "gi" : "g")
			),
			(k): matchedFunction => ({
				prototype: k[2],
				position: Number(k.index),
				length: k[0].length,
				match: k[0],
				name: insensitive ? (this.find_function(k[1]) as string) : k[1],
			})
		);
	}

	/**
	 * Processes the contents inside the brackets of an Akita function.
	 * @param options The lexer options.
	 * @param after The substring after the opening bracket.
	 * @param block The array of LexerAkitaFunction instances.
	 * @returns An object containing the processed fields, the inside string, and the modified block.
	 * @throws {LexerError} If there is a mismatch in the number of openers and closers.
	 */
	public inside(
		options: lexer_options,
		after: string,
		block: Array<LexerAkitaFunction<unknown>>
	) {
		const fields: LexerAkitaFunctionField<string>[] = [
			{ overloads: [], value: "" },
		];
		let escape = false;
		let closed = false;
		let inside = "";
		let depth = 0;

		for (let i = 1; i < after.length; i++) {
			const char = after[i];

			if (escape) {
				inside += char;
				escape = false;
			} else if (char === "\\") {
				escape = true;
			} else if (char === options.argument) {
				fields.push({ overloads: [], value: "" });
				inside += char;
			} else if (char === options.closer && depth <= 0) {
				closed = true;
				break;
			} else if (char === options.opener) {
				fields[fields.length - 1].value += char;
				inside += char;
				depth++;
			} else if (char === options.closer && depth > 0) {
				fields[fields.length - 1].value += char;
				inside += char;
				depth--;
			} else {
				fields[fields.length - 1].value += char;
				inside += char;
			}
		}

		for (let index = 0; index < fields.length; index++) {
			const overloads = fields[index].value.match(Lexer.SAF_EXPRESSION);
			if (overloads && overloads.length > 0) {
				for (const overload of overloads) {
					const maybe = block.findIndex((saf) => saf.identifier === overload);
					if (maybe !== -1) {
						fields[index].overloads.push(block[maybe] as LexerAkitaFunction<string>);
						block.splice(maybe, 1);
					}
				}
			}
		}

		if (!closed) {
			throw new LexerError(
				"Lexer.inside",
				"Missing closer!",
				"The Lexer expected the same or greater number of closers than openers"
			);
		}

		return { fields, inside, block };
	}

	/**
	 * Lexes the input string and extracts Akita functions.
	 * @param input The input string to lex.
	 * @param options Optional lexer options to customize the lexing behavior.
	 * @param debug Determines whether to enable debug mode or not.
	 * @returns An object containing the lexed block of Akita functions and the modified input string.
	 */
	public lex(
		input: string,
		options: Partial<lexer_options> = {},
		debug = false
	) {
		input = this.resolve(input, options as lexer_options);

		if (debug) console.log("\n", input);

		options = merge(options, this.default_options);

		// Match functions in the input string
		const matches = this.match_functions(input, options as lexer_options);

		let block: LexerAkitaFunction<unknown>[] = [];

		// Process matches in reverse order
		for (let index = matches.length - 1; index > -1; index--) {
			// Create a new LexerAkitaFunction instance
			const saf = new LexerAkitaFunction(
				options as lexer_options,
				matches[index],
				Lexer.generateToken()
			);

			// Extract the substring after the function match
			const after = input.slice(saf.position + saf.total.length);

			// Check if there is an opening bracket after the function match
			if (after.charAt(0) === options.opener) {
				// Process the contents inside the brackets
				const { block: iblock, fields } = this.inside(
					options as lexer_options,
					after,
					block
				);
				block = iblock;
				saf.fields = fields;
			}

			// Add the LexerAkitaFunction instance to the block
			block.unshift(saf);

			// Modify the input string by replacing the function match with its identifier
			input = input
				.slice(0, saf.position)
				.concat(saf.identifier, input.slice(saf.position + saf.total.length));
			if (debug) console.log("\n", input);
		}

		// Output the debug information if debug mode is enabled
		if (debug) {
			console.log(
				inspect(
					block.map((saf) => saf.toJSON()),
					{ depth: null, colors: true }
				)
			);
		}

		return { block, input };
	}

	public resolve(input: string, { opener, closer, argument }: lexer_options) {
		argument ??= this.default_options.argument as string;
		opener ??= this.default_options.opener as string;
		closer ??= this.default_options.closer as string;
		for (const [match, left, symbol, right] of Array.from(
			input.matchAll(Lexer.CONDITION_EXPRESSION),
			(match) => [match[0], match[1], match[4], match[5]]
		)) {
			const type = get_type(symbol);
			input = input.replace(
				match,
				type === "setter"
					? `akita-core:set${opener + left + argument + right + closer}`
					: `akita-core:condition${
							opener + type + argument + left + argument + right + closer
					  }`
			);
		}
		function get_type(symbol: string) {
			switch (symbol) {
				case "==":
					return "equal";
				case "!=":
					return "not equal";
				case ">":
					return "greater";
				case "<":
					return "lesser";
				case ">=":
					return "greater or equal";
				case "<=":
					return "lesser or equal";
				case "=":
					return "setter";
				default:
					return "unknown";
			}
		}
		return input;
	}
}

// lexer test
// const lex = new Lexer();
// lex.set_functions(["hi", "boo", "waaa"]);
// console.log(
// 	inspect(
// 		lex.lex("a == hi").input,
// 		{ depth: null, colors: true }
// 	)
// );
