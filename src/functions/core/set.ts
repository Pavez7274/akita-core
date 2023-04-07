import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil, set } from "lodash";

export default class _set extends AbstractAkitaFunction {
    override name = "@set";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@set require brackets");
        await this.solve_fields(data, self);
        
        set(data.extra.variables, self.fields[0].value, self.fields[1].value);
        this.resolve(data, self, self.fields[1].value);
        return data;
    }
}