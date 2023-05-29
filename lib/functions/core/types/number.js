"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("../../../classes/function");
const lodash_1 = require("lodash");
class _number extends function_1.AbstractAkitaFunction {
    name = "number";
    prototypes = [
        ".POSITIVE_INFINITY",
        ".NEGATIVE_INFINITY",
        ".MAX_SAFE_INTEGER",
        ".MIN_SAFE_INTEGER",
        ".MAX_VALUE",
        ".MIN_VALUE",
        ".EPSILON",
        ".NaN",
        ".parseInt",
        ".parseFloat",
        ".isSafeInteger",
        ".isInteger",
        ".isFinite",
        ".isNaN",
    ];
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            this.resolve(data, self, Number);
        else {
            if (typeof self.prototype === "string" &&
                (0, lodash_1.isFunction)((0, lodash_1.get)(Number, self.prototype.slice(1))))
                this.resolve(data, self, (0, lodash_1.invoke)(Number, self.prototype.slice(1), ...self.fields.map(({ value }) => value)));
            else if ((0, lodash_1.isNil)(self.prototype))
                this.resolve(data, self, Number(self.inside));
            else
                this.resolve(data, self, (0, lodash_1.get)(Number, self.prototype.slice(1)));
        }
        return data;
    }
}
exports.default = _number;
