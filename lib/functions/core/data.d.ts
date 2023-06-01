import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction, RequiredField } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class extends AbstractAkitaFunction {
    name: string;
    solve(this: Interpreter, self: RequiredField<akitaFunction, "fields">, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=data.d.ts.map