import { object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class sleep extends AbstractAkitaFunction {
    name: string;
    solve(self: akitaFunction, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=isJson.d.ts.map