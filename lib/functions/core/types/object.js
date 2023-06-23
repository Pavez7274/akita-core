"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../../classes/index");
var util_1 = tslib_1.__importStar(require("../../../classes/util"));
var lodash_1 = require("lodash");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:object";
        _this.name = "object";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
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
        (0, index_1.requiredFields)(1),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [index_1.LexerAkitaFunction, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(index_1.AbstractAkitaFunction));
exports.default = default_1;
