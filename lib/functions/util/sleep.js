"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class $sleep extends function_1.AbstractAkitaFunction {
    name = "$sleep";
    async solve(self, data) {
        const { fields } = self.fields(data.input);
        if ((0, lodash_1.isNil)(fields))
            throw new Error("$sleep require brackets");
        data.imports.includes("var { setTimeout } = require(\"timers/promises\");")
            || (data.imports += "var { setTimeout } = require(\"timers/promises\");");
        data.returns[self.id] = `await setTimeout(${fields.join(",")})`;
        data.input = data.input.replace(self.total, `SYSTEM_RESULT("${self.id}")`);
        return data;
    }
}
exports.default = $sleep;
