import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class log extends AbstractAkitaFunction {
    override name = "@log";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        await this.solve_fields(data, self);
        if (isNil(self.fields)) throw new Error("@log require brackets");
        console.log(...self.fields.map(({ value }) => value));
        this.resolve(data, self, "");
        return data;
    }
}