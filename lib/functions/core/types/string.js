"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../../classes/function");
const lodash_1 = require("lodash");
class _string extends function_1.AbstractAkitaFunction {
    name = "string";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$string require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, String(self.inside));
        return data;
    }
}
exports.default = _string;
