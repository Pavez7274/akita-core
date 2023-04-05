"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const interpreter_1 = require("../../classes/interpreter");
const function_1 = require("../../classes/function");
const util_1 = tslib_1.__importDefault(require("../../classes/util"));
const lodash_1 = require("lodash");
class sleep extends function_1.AbstractAkitaFunction {
    name = "@isJson";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside))
            throw new Error("@isJson require brackets");
        await interpreter_1.Interpreter.solve_fields(data, self);
        const x = util_1.default.parse_object(self.inside);
        data.input = data.input.replace(self.id, x ? "true" : "false");
        return data;
    }
}
exports.default = sleep;
