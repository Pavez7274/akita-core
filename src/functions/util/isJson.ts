import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { isEqual, isNil, isObjectLike, keys } from "lodash";
import { akitaFunction } from "../../classes/lexer";
import Util from "../../classes/util";

export default class _isObject extends AbstractAkitaFunction {
    override name = "@isObject";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data): Promise<object_data> {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@isObject require brackets");
        await this.solve_fields(data, self);
        if (self.prototype === ".like") {
            const x = Util.parse_object(self.fields[0].value) as object,
                t = Util.parse_object(self.fields[1].value) as object;
            if (isObjectLike(x) && isObjectLike(t))
                this.resolve(data, self, isEqual(keys(x), keys(t)));
            else this.resolve(data, self, false);
        } else this.resolve(data, self, isObjectLike(Util.parse_object(self.inside)));
        return data;
    }
}