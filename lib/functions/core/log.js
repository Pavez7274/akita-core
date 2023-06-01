"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var function_1 = require("../../classes/function");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "log";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        console.log.apply(console, self.fields.map(function (_a) {
                            var value = _a.value;
                            return value;
                        }));
                        this.resolve(data, self, "");
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
    ], default_1.prototype, "solve", null);
    return default_1;
}(function_1.AbstractAkitaFunction));
exports.default = default_1;
