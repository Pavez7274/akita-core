import { Interpreter, object_data } from "../../classes/interpreter";
import { akitaFunction } from "../../classes/lexer";
import { AbstractAkitaFunction, RequiredField } from "../../classes/function";
export default class extends AbstractAkitaFunction {
    type: "parent";
    name_in: string;
    name: string;
    solve(this: Interpreter, self: RequiredField<akitaFunction, "fields">, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=try.d.ts.map