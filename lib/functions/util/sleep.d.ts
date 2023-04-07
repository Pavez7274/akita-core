import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class sleep extends AbstractAkitaFunction {
    name: string;
    solve(this: Interpreter, self: akitaFunction, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=sleep.d.ts.map