import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class _try extends AbstractAkitaFunction {
    type = "parent" as const;
    override name = "@try";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        let ret = true;
        if (isNil(self.inside)) throw new Error("@try require brackets");
        if (data.epd === "catch") {
            await this.solve_field(data, self, 1);
            ret = false;
        } else await this.solve_field(data, self, 0);
        if (self.fields && !isNil(self.fields[2])) await this.solve_field(data, self, 2);
        this.resolve(data, self, ret);
        return data;
    }
}