import { VoidAkitaFunction } from "./classes/";
import { cwd } from "process";

export * from "./classes/index";
export const core_functions_mod = cwd().concat("/functions/core/");
export const util_functions_mod = cwd().concat("/functions/util/");
export const akita_functions_mod = cwd().concat("/functions/");
export function withPrefix(prefix: string) {
	return async (t: VoidAkitaFunction) => {
		t.name = prefix.concat(t.name);
		return t;
	};
}
