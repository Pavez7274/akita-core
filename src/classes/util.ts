import { parse, DeserializeOptions } from "hjson";
import { object_data } from "./interpreter";
import { Dirent, readdirSync } from "fs";
import { Lexer } from "./lexer";

export function iterate<T, R>(
	iterator: IterableIterator<T>,
	cb: (value: T, index: number, iter: IterableIterator<T>) => R
) {
	let item: IteratorResult<T, R>,
		index = 0;
	while ((item = iterator.next())) {
		if (item.done) break;
		cb(item.value, index++, iterator);
	}
}
export class AkitaError extends Error {
	constructor(msg: string) {
		super("\u001b[41m".concat(msg, "\u001b[0m"));
	}
}
export default class Util {
	static readonly falsys = [
		"",
		"0",
		"no",
		"null",
		"NaN",
		"void",
		"none",
		"false",
		"undefined",
	];
	static parse_object(
		to_solve: string,
		options?: DeserializeOptions,
		default_value?: object,
		suppress = true
	) {
		try {
			return parse(to_solve, options) as object;
		} catch (error) {
			if (!suppress) throw error;
			return default_value;
		}
	}
	static booleanify(str: string) {
		const number = Number(str);
		return isNaN(number) ? !this.falsys.includes(str) : number > 0;
	}
	static get_files(mod: string, result: Dirent[] = []) {
		// mod = require.resolve(mod);
		const files = readdirSync(mod, { withFileTypes: true });
		for (const file of files) {
			file.name = `${mod}/${file.name}`;
			file.isDirectory() ? this.get_files(file.name, result) : result.push(file);
		}
		return result;
	}
	static interpolate_strig(field: string, data: object_data) {
		return field.includes("SAR")
			? field.replace(Lexer.SAR_EXPRESSION, (m) => `${data.results[m]}`)
			: field;
	}
}
