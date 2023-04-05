import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class log extends AbstractAkitaFunction {
    override name = "@log";
    override async solve(self: akitaFunction, data: object_data) {
        await Interpreter.solve_fields(data, self);
        if (isNil(self.inside)) throw new Error("@log require brackets");
        console.log(self.inside);
        data.input.replace(self.id, "");
        return data;
    }
}