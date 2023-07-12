import { readFileSync } from "fs";
import { Interpreter, record } from "./interpreter";
import Util from "./util";
import { isNil } from "lodash";

export class Reader {
	public exports: record = {};
	constructor(private interpreter: Interpreter) {
		// imagine read my code lol
		// i was listening El Pintor and Untitled
	}
	public async run_dir(mod: string) {
		const codes = this.read_dir(mod);
		for (const el of codes) {
			const data = await this.interpreter.solve(
				this.read_file(el.name),
				this.interpreter.lexer.default_options,
				{}
			);
			if (
				data.extra?.variables &&
				"export" in data.extra.variables &&
				!isNil(data.extra.variables.export)
			) {
				this.exports[el.name] = data.extra.variables.export;
			}
		}
	}
	public async run_file(mod: string) {
		const data = await this.interpreter.solve(
			this.read_file(mod),
			this.interpreter.lexer.default_options,
			{}
		);
		if (
			data.extra?.variables &&
			"export" in data.extra.variables &&
			!isNil(data.extra.variables.export)
		) {
			this.exports[mod] = data.extra.variables.export;
		}
		return data.extra?.variables.export;
	}
	public read_dir(mod: string) {
		return Util.get_files(mod).filter((el) => el.name.endsWith(".akita"));
	}
	public read_file(mod: string) {
		if (!mod.endsWith(".akita"))
			throw new Error("Invalid file provided, the extension must be '.akita'");
		return readFileSync(mod, "utf8");
	}
}
