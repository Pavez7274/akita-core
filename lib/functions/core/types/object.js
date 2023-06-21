"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../../classes/interpreter");
var function_1 = require("../../../classes/function");
var lodash_1 = require("lodash");
var util_1 = tslib_1.__importStar(require("../../../classes/util"));
var _object = (function (_super) {
    tslib_1.__extends(_object, _super);
    function _object() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "object";
        return _this;
    }
    _object.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var obj, def;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        obj = util_1.default.parse_object(self.fields[0].value), def = self.fields[1] ? util_1.default.parse_object(self.fields[1].value) : null;
                        if ((0, lodash_1.isNil)(obj) || !(0, lodash_1.isObjectLike)(obj))
                            throw new util_1.AkitaError("Invalid object gived in " + self.total);
                        if (def !== null && !(0, lodash_1.isObjectLike)(obj))
                            throw new util_1.AkitaError("Invalid object (default) gived in " + self.total);
                        (0, lodash_1.defaults)(obj, def);
                        this.resolve(data, self, obj);
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, function_1.requiredFields)(1),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], _object.prototype, "solve", null);
    return _object;
}(function_1.AbstractAkitaFunction));
exports.default = _object;
