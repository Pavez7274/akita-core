import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { get, isNil } from "lodash";

export default class _this extends AbstractAkitaFunction {
    override name = "@this";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@this require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, get(this, self.fields[0].value, self.fields[1]?.value));
        return data;
    }
}