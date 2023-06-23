"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var classes_1 = require("../../../classes");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:condition";
        _this.name = "condition";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, operator, left, right;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _b.sent();
                        _a = self.fields, operator = _a[0], left = _a[1], right = _a[2];
                        switch (operator.value) {
                            case "equal":
                                this.resolve(data, self, (0, lodash_1.isEqual)(left, right));
                                break;
                            case "strict equal":
                                this.resolve(data, self, (0, lodash_1.eq)(left, right));
                                break;
                            case "not equal":
                                this.resolve(data, self, left != right);
                                break;
                            case "strict not equal":
                                this.resolve(data, self, left !== right);
                                break;
                            case "lesser":
                                this.resolve(data, self, (0, lodash_1.lt)(left, right));
                                break;
                            case "lesser or equal":
                                this.resolve(data, self, (0, lodash_1.lte)(left, right));
                                break;
                            case "greater":
                                this.resolve(data, self, (0, lodash_1.gt)(left, right));
                                break;
                            case "greater or equal":
                                this.resolve(data, self, (0, lodash_1.gte)(left, right));
                                break;
                            default:
                                throw SyntaxError("Invalid operator provided in ".concat(self.total));
                        }
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, classes_1.requiredFields)(2),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [classes_1.LexerAkitaFunction, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(classes_1.AbstractAkitaFunction));
exports.default = default_1;
