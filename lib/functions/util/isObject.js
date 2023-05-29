"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const function_1 = require("../../classes/function");
const lodash_1 = require("lodash");
const util_1 = tslib_1.__importDefault(require("../../classes/util"));
class default_1 extends function_1.AbstractAkitaFunction {
    name = "isObject";
    prototypes = [".like"];
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$isObject require brackets");
        await this.solve_fields(data, self);
        if (self.prototype === ".like") {
            const x = util_1.default.parse_object(self.fields[0].value), t = util_1.default.parse_object(self.fields[1].value);
            if ((0, lodash_1.isObjectLike)(x) && (0, lodash_1.isObjectLike)(t))
                this.resolve(data, self, (0, lodash_1.isEqual)((0, lodash_1.keys)(x), (0, lodash_1.keys)(t)));
            else
                this.resolve(data, self, false);
        }
        else
            this.resolve(data, self, (0, lodash_1.isObjectLike)(util_1.default.parse_object(self.inside)));
        return data;
    }
}
exports.default = default_1;
