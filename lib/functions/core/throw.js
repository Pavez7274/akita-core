"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class default_1 extends function_1.AbstractAkitaFunction {
    name = "throw";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$throw require brackets");
        await this.solve_fields(data, self);
        const error = new Error(self.fields[0].value);
        (0, lodash_1.isNil)(self.fields[1].value) || (error.name = self.fields[1].value);
        throw error;
        return data;
    }
}
exports.default = default_1;
