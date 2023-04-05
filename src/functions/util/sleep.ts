import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { setTimeout } from "timers/promises";
import { isNil, noop } from "lodash";

export default class sleep extends AbstractAkitaFunction {
    override name = "@sleep";
    override async solve(self: akitaFunction, data: object_data): Promise<object_data> {
        if (isNil(self.fields)) throw new Error("@sleep require brackets");
        await Interpreter.solve_fields(data, self);
        await setTimeout(Number(self.fields[0].value), noop);
        data.input = data.input.replace(self.id, "true");
        return data;
    }
}