"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class $log extends function_1.AbstractAkitaFunction {
    name = "$log";
    async solve(self, data) {
        let { fields } = self.fields(data.input);
        if ((0, lodash_1.isNil)(fields))
            throw new Error("$log require brackets");
        fields = fields.map(f => `"${f.replace(/"/g, "\\\"")}"`);
        data.returns[self.id] = `console.log(${fields.join(",")})`;
        data.input = data.input.replace(self.total, `SYSTEM_RESULT("${self.id}")`);
        return data;
    }
}
exports.default = $log;
