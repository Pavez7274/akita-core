"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const function_1 = require("../../classes/function");
function _(obj, path, defaultValue) {
    const args = (0, lodash_1.drop)(arguments, 3);
    if ((0, lodash_1.isFunction)((0, lodash_1.get)(obj, path)) && args.length) {
        return (0, lodash_1.spread)((0, lodash_1.bindKey)(obj, path))(args);
    }
    else {
        return (0, lodash_1.result)(obj, path, defaultValue);
    }
}
class _get extends function_1.AbstractAkitaFunction {
    name = "@get";
    prototypes = [".strict", ".invoke"];
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("@get require brackets");
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
exports.default = _get;
