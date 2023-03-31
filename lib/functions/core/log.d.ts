import { transpilerData } from "../../classes/transpiler";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class $log extends AbstractAkitaFunction {
    name: string;
    solve(self: akitaFunction, data: transpilerData): Promise<transpilerData>;
}
//# sourceMappingURL=log.d.ts.map