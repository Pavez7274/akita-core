import { Lexer, LexerAkitaFunction, type lexer_options } from "./lexer";
import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { isEmpty, isNil, isObject, merge } from "lodash";
import Util, { AkitaError } from "./util";
import { akita_functions_mod } from "..";
import { Reader } from "./reader";
import { inspect } from "util";

export type record = Record<string, unknown>;
export type object_data = record & {
	extra: record & {
		variables: record;
	};
	parents: string[];
	results: record;
	input: string;
	epd: unknown;
};

export type InterpreterOptions = {
	lexer?: lexer_options;
};

export type InterpreterDebugOptions = {
	/**
	 * If it is due or not to show the new input
	 */
	parsed_input?: boolean;
	/**
	 * If it is due or not to show the input received
	 */
	gived_input?: boolean;
	/**
	 * If it is due or not that show the data of the Lexer
	 */
	lexer?: boolean;
	/**
	 * This only adds color to the logs you do
	 */
	executions?: boolean;
	/**
	 * If it is due or not to show the final object data
	 */
	final?:
		| boolean
		| {
				depth: number;
		  };
};

export class Interpreter {
	static functions: Array<AbstractAkitaFunction> = [];
	public readonly reader: Reader;
	public readonly lexer: Lexer;
	constructor(readonly options?: InterpreterOptions) {
		this.reader = new Reader(this);
		this.lexer = new Lexer(options?.lexer);
		this.lexer.set_functions(
			Interpreter.functions
				.map((abs) => {
					const r = [abs.name];
					abs.name_in && r.push(abs.name_in);
					return r;
				})
				.flat(1)
		);
	}
	async solve_fields(
		data: object_data,
		saf: LexerAkitaFunction<unknown>,
		i?: number[],
		s = 0,
		e?: number
	) {
		if (isNil(saf.fields) || isEmpty(saf.fields)) return saf;
		for (let index = s; index < saf.fields.length; index++) {
			if (e === index) break;
			if (i && i.includes(index)) continue;
			saf = await this.solve_field(data, saf, index);
		}
		return saf;
	}
	async solve_field(
		data: object_data,
		saf: LexerAkitaFunction<unknown>,
		index: number
	) {
		if (isNil(saf.fields) || isEmpty(saf.fields) || isNil(saf.fields[index]))
			return saf;
		const bass = data;
		for (const overload of saf.fields[index].overloads) {
			data.input = saf.fields[index].value as string;
			const finded = Interpreter.functions.find(
					(n) => n.name_in === overload.name || n.name === overload.name
				) as AbstractAkitaFunction,
				reject = await finded.solve.apply(this, [overload, data]);
			if (reject.input) {
				const results = reject.input.match(Lexer.SAR_EXPRESSION);
				if (results) {
					if (reject.input === results[0])
						saf.fields[index].value = data.results[results[0]];
					else saf.fields[index].value = Util.interpolate_strig(reject.input, data);
				} else saf.fields[index].value = reject.input;
			}
		}
		data.input = bass.input;
		return saf;
	}
	static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>) {
		for (const abs_based_function of abs_based_functions) {
			const abs = new abs_based_function();
			Interpreter.functions.push(abs);
		}
	}
	public static async load_core_functions(
		cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction
	) {
		await this.load_functions(akita_functions_mod, cb);
	}
	public static async load_functions(
		mod: string,
		cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction
	) {
		for (const file of Util.get_files(mod).filter((el) =>
			el.name.endsWith(".js")
		)) {
			try {
				let abs = new (
					(await import(file.name)) as { default: typeof VoidAkitaFunction }
				).default();
				if (cb) abs = await cb(abs);
				this.functions.push(abs);
			} catch (error) {
				console.log(
					"\u001b[31mThere was an error loading %s\n%s\u001b[0m",
					file.name,
					(<Error>error).message
				);
			}
		}
	}
	public resolve<T, D extends object_data>(
		data: D,
		saf: LexerAkitaFunction<unknown>,
		rpr: T
	) {
		const res_id = `SAR(${saf.uid})`;
		data.input = data.input.replace(saf.identifier, res_id);
		data.results[res_id] = rpr;
	}
	public async solve(
		input: string,
		options: Partial<lexer_options>,
		data: Partial<object_data>,
		debug: boolean | InterpreterDebugOptions = false
	) {
		if ((isObject(debug) && debug.gived_input) || debug === true)
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Gived Input  \u001b[90m${new Date().toLocaleString()}\n\u001b[31m%s\u001b[0m\n`,
				input
			);
		const { input: linput, block } = this.lexer.lex(
			input,
			options,
			isObject(debug) ? debug.lexer : debug
		);
		input = linput;
		if ((isObject(debug) && debug.parsed_input) || debug === true)
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Parsed  \u001b[90m${new Date().toLocaleString()}\n\u001b[31m%s\u001b[0m\n`,
				input
			);
		merge(data, {
			results: {},
			parents: [],
			extra: {
				variables: {},
			},
			epd: null,
			input,
		});
		if ((isObject(debug) && debug.executions) || debug === true)
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Executions  \u001b[90m${new Date().toLocaleString()}\u001b[34m`
			);
		for (const saf of block) {
			const finded = Interpreter.functions.find(
				(f) => f.name_in === saf.name || f.name === saf.name
			);
			if (isNil(finded)) continue;
			if (saf.prototype) {
				if (!finded.prototypes.includes(saf.prototype))
					throw new AkitaError(
						`${saf.name} doesn't have the prototype "${saf.prototype}"`
					);
				else if (finded.prototypes.length === 0)
					throw new AkitaError(`${saf.name} doesn't have prototypes`);
			}
			if (finded.type === "parent")
				data.parents?.push(finded.name_in || finded.name);
			try {
				data = await finded.solve.apply(this, [saf, <object_data>data]);
			} catch (error) {
				if (finded.name_in === "akita-core:try") {
					(<object_data["extra"]>data.extra).error = error;
					data = await finded.solve.apply(this, [saf, <object_data>data]);
				} else throw error;
			}
			finded.type === "parent" && data.parents?.pop();
			data.epd = null;
		}
		if ((isObject(debug) && debug.executions) || debug === true)
			console.log("\u001b[0m\n");
		if ((isObject(debug) && debug.final) || debug === true) {
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Final  \u001b[90m${new Date().toLocaleString()}\n\u001b[0m%s\n`,
				inspect(data, {
					depth: isObject(debug) && isObject(debug.final) ? debug.final.depth : null,
					colors: true,
				})
			);
		}
		return data;
	}
}
