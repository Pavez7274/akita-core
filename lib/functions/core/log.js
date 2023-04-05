"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../../classes/interpreter");
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
class log extends function_1.AbstractAkitaFunction {
    name = "@log";
    async solve(self, data) {
        await interpreter_1.Interpreter.solve_fields(data, self);
        if ((0, lodash_1.isNil)(self.inside))
            throw new Error("@log require brackets");
        console.log(self.inside);
        data.input.replace(self.id, "");
        return data;
    }
}
exports.default = log;
