"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class default_1 extends function_1.AbstractAkitaFunction {
    name = "this";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$this require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, (0, lodash_1.get)(this, self.fields[0].value, self.fields[1]?.value));
        return data;
    }
}
exports.default = default_1;
