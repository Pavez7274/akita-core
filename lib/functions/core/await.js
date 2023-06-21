"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var function_1 = require("../../classes/function");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "import";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _c.sent();
                        _a = this.resolve;
                        _b = [data,
                            self];
                        return [4, self.fields.map(function (_a) {
                                var value = _a.value;
                                return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4, value];
                                        case 1: return [2, _b.sent()];
                                    }
                                }); });
                            })];
                    case 2:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, function_1.requiredFields)(2),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(function_1.AbstractAkitaFunction));
exports.default = default_1;
