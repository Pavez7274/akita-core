import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { Lexer, default_lexer_options, akitaFunction } from "./lexer";
import { isNil, isObject, merge } from "lodash";
import Util, { AkitaError } from "./util";
import { functionFields } from "./lexer";
import { inspect } from "util";
import { akita_functions_mod } from "..";

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
	lexer?: typeof default_lexer_options;
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
	final?: boolean;
};

export class Interpreter {
	static functions: Record<string, AbstractAkitaFunction> = {};
	public readonly lexer: Lexer;
	constructor(readonly options?: InterpreterOptions) {
		this.lexer = new Lexer(options?.lexer);
		this.lexer.set_functions(Object.keys(Interpreter.functions));
	}
	async solve_fields(
		data: object_data,
		af: akitaFunction,
		i?: number[],
		s = 0,
		e?: number
	) {
		if (isNil(af.fields)) return af;
		for (let index = s; index < (<functionFields[]>af.fields).length; index++) {
			if (e === index) break;
			if (i && i.includes(index)) continue;
			af = await this.solve_field(data, af, index);
		}
		return af;
	}
	async solve_field(data: object_data, af: akitaFunction, index: number) {
		if (isNil(af.fields) || isNil(af.fields[index])) return af;
		const bass = data;
		for (const overload of af.fields[index].overloads) {
			data.input = af.fields[index].value;
			const finded = Interpreter.functions[overload.name],
				reject = await finded.solve.apply(this, [overload, data]);
			if (reject.input) {
				const results = reject.input.match(/SYSTEM_RESULT\(\d+\)/g);
				if (results) {
					if (reject.input === results[0])
						af.fields[index].value = data.results[results[0]] as string;
					else af.fields[index].value = Util.interpolate_strig(reject.input, data);
				} else af.fields[index].value = reject.input;
				af.inside = af.fields.map((f) => f.value).join("|");
				af.total = `${af.name}[${af.inside}]`;
			}
		}
		data.input = bass.input;
		return af;
	}
	static add_functions(...abs_based_functions: Array<typeof VoidAkitaFunction>) {
		for (const abs_based_function of abs_based_functions) {
			const t = new abs_based_function();
			Interpreter.functions[t.name] = t;
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
				let t = new (
					(await import(file.name)) as { default: typeof VoidAkitaFunction }
				).default();
				if (cb) t = await cb(t);
				this.functions[t.name] = t;
			} catch (error) {
				console.log(
					"\u001b[31mThere was an error loading %s\n%s\u001b[0m",
					file.name,
					(<Error>error).message
				);
			}
		}
	}
	public resolve<T = unknown>(data: object_data, af: akitaFunction, rpr: T) {
		const res_id = `SYSTEM_RESULT(${af._id})`;
		data.input = data.input.replace(af.id, res_id);
		data.results[res_id] = rpr;
	}
	public async solve(
		data: Partial<object_data>,
		debug: boolean | InterpreterDebugOptions = false
	) {
		if ((isObject(debug) && debug.gived_input) || debug === true)
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Gived Input  \u001b[90m${new Date().toLocaleString()}\n\u001b[31m%s\u001b[0m\n`,
				this.lexer.input
			);
		const { input, functions_array } = this.lexer.main(
			isObject(debug) ? debug.lexer : debug
		);
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
		for (const af of functions_array) {
			const finded = Interpreter.functions[af.name];
			if (af.prototype) {
				if (!finded.prototypes.includes(af.prototype))
					throw new AkitaError(
						`${af.name} doesn't have the prototype "${af.prototype}"`
					);
				else if (finded.prototypes.length === 0)
					throw new AkitaError(`${af.name} doesn't have prototypes`);
			}
			if (finded.type === "parent") data.parents?.push(finded.name);
			try {
				data = await finded.solve.apply(this, [af, <object_data>data]);
			} catch (error) {
				if (data.parents?.length === 0 || !data.parents?.includes("$try"))
					throw error;
				else if (data.parents.includes("$try")) {
					data.epd = "catch";
					(<object_data["extra"]>data.extra).error = error;
					data = await finded.solve.apply(this, [af, <object_data>data]);
				}
			}
			finded.type === "parent" && data.parents?.pop();
			data.epd = null;
		}
		if ((isObject(debug) && debug.executions) || debug === true)
			console.log("\u001b[0m\n");
		if ((isObject(debug) && debug.final) || debug === true) {
			console.log(
				`\u001b[44m[ DEBUG ]\u001b[0m Final  \u001b[90m${new Date().toLocaleString()}}\n%s\n\u001b[0m`,
				inspect(data, { depth: null, colors: true })
			);
		}
		return data;
	}
}
