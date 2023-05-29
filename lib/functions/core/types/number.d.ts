import { Interpreter, object_data } from "../../../classes/interpreter";
import { AbstractAkitaFunction } from "../../../classes/function";
import { akitaFunction } from "../../../classes/lexer";
export default class _number extends AbstractAkitaFunction {
    name: string;
    prototypes: string[];
    solve(this: Interpreter, self: akitaFunction, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=number.d.ts.map