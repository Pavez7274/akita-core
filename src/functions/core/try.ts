import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class _try extends AbstractAkitaFunction {
    type = "parent" as const;
    override name = "@try";
    override async solve(self: akitaFunction, data: object_data) {
        let ret = "true";
        if (isNil(self.inside)) throw new Error("@try require brackets");
        if (data.epd === "catch") {
            await Interpreter.solve_field(data, self, 1);
            ret = "false";
        } else await Interpreter.solve_field(data, self, 0);
        if (self.fields && !isNil(self.fields[2])) await Interpreter.solve_field(data, self, 2);
        data.input.replace(self.id, ret);
        return data;
    }
}