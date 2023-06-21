import { VoidAkitaFunction } from "./classes/";

export * from "./classes/index";
export const core_functions_mod = __dirname.concat("/functions/core/");
export const util_functions_mod = __dirname.concat("/functions/util/");
export const akita_functions_mod = __dirname.concat("/functions/");
export function withPrefix(prefix: string) {
	return async (t: VoidAkitaFunction) => {
		t.name = prefix.concat(t.name);
		return t;
	};
}
