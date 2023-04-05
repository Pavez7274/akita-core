"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interpreter_1 = require("../../classes/interpreter");
const function_1 = require("../../classes/function");
const promises_1 = require("timers/promises");
const lodash_1 = require("lodash");
class sleep extends function_1.AbstractAkitaFunction {
    name = "@sleep";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.fields))
            throw new Error("@sleep require brackets");
        await interpreter_1.Interpreter.solve_fields(data, self);
        await (0, promises_1.setTimeout)(Number(self.fields[0].value), lodash_1.noop);
        data.input = data.input.replace(self.id, "true");
        return data;
    }
}
exports.default = sleep;