import { transpilerData } from "../../classes/transpiler";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class $sleep extends AbstractAkitaFunction {
    name: string;
    solve(self: akitaFunction, data: transpilerData): Promise<transpilerData>;
}
//# sourceMappingURL=sleep.d.ts.map