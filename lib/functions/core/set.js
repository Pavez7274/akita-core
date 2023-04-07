"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class _set extends function_1.AbstractAkitaFunction {
    name = "@set";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("@set require brackets");
        await this.solve_fields(data, self);
        (0, lodash_1.set)(data.extra.variables, self.fields[0].value, self.fields[1].value);
        this.resolve(data, self, self.fields[1].value);
        return data;
    }
}
exports.default = _set;
