"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const function_1 = require("../../../classes/function");
const lodash_1 = require("lodash");
const util_1 = tslib_1.__importDefault(require("../../../classes/util"));
class _object extends function_1.AbstractAkitaFunction {
    name = "object";
    async solve(self, data) {
        if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
            throw new Error("$object require brackets");
        await this.solve_fields(data, self);
        const obj = util_1.default.parse_object(self.fields[0].value), def = self.fields[1] ? util_1.default.parse_object(self.fields[1].value) : null;
        if ((0, lodash_1.isNil)(obj) || !(0, lodash_1.isObjectLike)(obj))
            throw new Error("Invalid object gived in " + self.total);
        if (def !== null && !(0, lodash_1.isObjectLike)(obj))
            throw new Error("Invalid object (default) gived in " + self.total);
        (0, lodash_1.defaults)(obj, def);
        this.resolve(data, self, obj);
        return data;
    }
}
exports.default = _object;
