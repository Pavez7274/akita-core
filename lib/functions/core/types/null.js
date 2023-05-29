"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../../classes/function");
class _null extends function_1.AbstractAkitaFunction {
    name = "null";
    async solve(self, data) {
        if (self.fields)
            await this.solve_fields(data, self);
        this.resolve(data, self, null);
        return data;
    }
}
exports.default = _null;
