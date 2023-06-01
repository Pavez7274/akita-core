import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { AbstractAkitaFunction, RequiredField } from "../../classes/function";
export default class extends AbstractAkitaFunction {
    name: string;
    prototypes: string[];
    solve(this: Interpreter, self: RequiredField<akitaFunction, "fields" | "inside">, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=isObject.d.ts.map