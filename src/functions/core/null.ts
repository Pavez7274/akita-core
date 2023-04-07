import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";

export default class _null extends AbstractAkitaFunction {
    override name = "@null";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (self.fields) await this.solve_fields(data, self);
        this.resolve(data, self, null);
        return data;
    }
}