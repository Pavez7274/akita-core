"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../../classes/interpreter");
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class _try extends function_1.AbstractAkitaFunction {
    type = "parent";
    name = "@try";
    async solve(self, data) {
        let ret = "true";
        if ((0, lodash_1.isNil)(self.inside))
            throw new Error("@try require brackets");
        if (data.epd === "catch") {
            await interpreter_1.Interpreter.solve_field(data, self, 1);
            ret = "false";
        }
        else
            await interpreter_1.Interpreter.solve_field(data, self, 0);
        if (self.fields && !(0, lodash_1.isNil)(self.fields[2]))
            await interpreter_1.Interpreter.solve_field(data, self, 2);
        data.input.replace(self.id, ret);
        return data;
    }
}
exports.default = _try;