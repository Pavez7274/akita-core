import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { AbstractAkitaFunction, RequiredField } from "../../classes/function";
export default class extends AbstractAkitaFunction {
    name: string;
    solve(this: Interpreter, self: RequiredField<akitaFunction, "fields">, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=throw.d.ts.map