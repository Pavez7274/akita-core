"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class default_1 extends function_1.AbstractAkitaFunction {
    name = "log";
    async solve(self, data) {
        await this.solve_fields(data, self);
        if ((0, lodash_1.isNil)(self.fields))
            throw new Error("$log require brackets");
        console.log(...self.fields.map(({ value }) => value));
        this.resolve(data, self, "");
        return data;
    }
}
exports.default = default_1;
