import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { get, isNil } from "lodash";

export default class _data extends AbstractAkitaFunction {
    override name = "@data";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@data require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, get(data, self.fields[0].value, self.fields[1]?.value));
        return data;
    }
}