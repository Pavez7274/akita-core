"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const function_1 = require("../../classes/function");
function _(object, key, ...rest) {
    const res = (0, lodash_1.get)(object, key, rest[0]);
    return (0, lodash_1.isFunction)(res) && rest.length > 1
        ? res.apply(rest[0], rest.slice(1))
        : (0, lodash_1.result)(object, key, rest[0]);
}
class default_1 extends function_1.AbstractAkitaFunction {
    name = "get";
    prototypes = [".strict", ".invoke"];
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$get require brackets");
        await this.solve_fields(data, self);
        if (self.prototype === ".strict")
            this.resolve(data, self, (0, lodash_1.get)(data.extra.variables, self.fields[0].value, self.fields[1]?.value));
        else if (self.prototype === ".invoke")
            this.resolve(data, self, (0, lodash_1.invoke)(data.extra.variables, self.fields[0].value, ...self.fields.slice(1).map(({ value }) => value)));
        else
            this.resolve(data, self, _(data.extra.variables, self.fields[0].value, ...self.fields.slice(1).map(({ value }) => value)));
        return data;
    }
}
exports.default = default_1;
