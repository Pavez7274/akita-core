import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { defaults, isNil, isObjectLike } from "lodash";
import Util from "../../classes/util";

export default class _object extends AbstractAkitaFunction {
    override name = "@object";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@object require brackets");
        await this.solve_fields(data, self);
        const obj = Util.parse_object(self.fields[0].value),
            def = self.fields[1]
                ? Util.parse_object(self.fields[1].value)
                : null;
        if (isNil(obj) || !isObjectLike(obj))
            throw new Error("Invalid object gived in " + self.total);
        if (def !== null && !isObjectLike(obj))
            throw new Error("Invalid object (default) gived in " + self.total);
        defaults(obj, def);
        this.resolve(data, self, obj);
        return data;
    }
}