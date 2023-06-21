"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var lodash_1 = require("lodash");
var function_1 = require("../../classes/function");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "throw";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _b.sent();
                        error = new Error(self.fields[0].value);
                        (0, lodash_1.isNil)((_a = self.fields[1]) === null || _a === void 0 ? void 0 : _a.value) || (error.name = self.fields[1].value);
                        throw error;
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, function_1.requiredFields)(1),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(function_1.AbstractAkitaFunction));
exports.default = default_1;
