import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class _typeof extends AbstractAkitaFunction {
    override name = "@typeof";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@typeof require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, typeof self.fields[0].value);
        return data;
    }
}