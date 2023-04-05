import { object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
export default class _try extends AbstractAkitaFunction {
    type: "parent";
    name: string;
    solve(self: akitaFunction, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=try.d.ts.map