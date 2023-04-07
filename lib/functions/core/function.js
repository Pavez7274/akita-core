"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class _function extends function_1.AbstractAkitaFunction {
    name = "@function";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("@function require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, new Function(`"use strict";\n${self.inside}`).bind(this));
        return data;
    }
}
exports.default = _function;
