import { AbstractAkitaFunction, VoidAkitaFunction } from "./function";
import { Lexer, default_lexer_options, akitaFunction } from "./lexer";
import { functionFields } from "./lexer";
import { isNil, merge } from "lodash";
import { inspect } from "util";
import Util from "./util";

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
	public static async load_functions(
		mod: string,
		cb?: (t: VoidAkitaFunction) => Promise<VoidAkitaFunction> | VoidAkitaFunction
	) {
		for (const file of Util.get_files(mod).filter((el) =>
			el.name.endsWith(".js")
		)) {
			let t = new (
				(await import(file.name)) as { default: typeof VoidAkitaFunction }
			).default();
			if (cb) t = await cb(t);
			Interpreter.functions[t.name] = t;
		}
	}
	public resolve<T = unknown>(data: object_data, af: akitaFunction, rpr: T) {
		const res_id = `SYSTEM_RESULT(${af._id})`;
		data.input = data.input.replace(af.id, res_id);
		data.results[res_id] = rpr;
	}
	public async solve(data: object_data, debug = false) {
		debug &&
			console.log("[ DEBUG ]   Gived Input\n\x1b[31m%s\x1b[0m", this.lexer.input);
		const { input, functions_array } = this.lexer.main(debug);
		debug && console.log("[ DEBUG ]   Parsed\n\x1b[31m%s\x1b[0m", input);
		merge(data, {
			results: {},
			parents: [],
			extra: {
				variables: {},
			},
			epd: null,
			input,
		});
		debug && console.log("[ DEBUG ]   Executions\x1b[34m");
		for (const af of functions_array) {
			const finded = Interpreter.functions[af.name];
			if (af.prototype) {
				if (!finded.prototypes.includes(af.prototype))
					throw new Error(`${af.name} doesn't have the prototype "${af.prototype}"`);
				else if (finded.prototypes.length === 0)
					throw new Error(`${af.name} doesn't have prototypes`);
			}
			if (finded.type === "parent") data.parents.push(finded.name);
			try {
				data = await finded.solve.apply(this, [af, data]);
			} catch (error) {
				if (data.parents.length === 0 || !data.parents.includes("$try"))
					throw error;
				else if (data.parents.includes("$try")) {
					data.epd = "catch";
					data.extra.error = error;
					data = await finded.solve.apply(this, [af, data]);
				}
			}
			finded.type === "parent" && data.parents.pop();
			data.epd = null;
		}
		debug &&
			console.log(
				"\x1b[0m[ DEBUG ]   Final\n%s",
				inspect(data, { depth: null, colors: true })
			);
		return data;
	}
}
