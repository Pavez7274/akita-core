"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../../classes/interpreter");
var function_1 = require("../../../classes/function");
var AsyncFunction = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            null;
            return [2];
        });
    });
}.constructor;
var _function = (function (_super) {
    tslib_1.__extends(_function, _super);
    function _function() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "function";
        _this.prototypes = [".async"];
        return _this;
    }
    _function.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        this.resolve(data, self, typeof self.prototype === "string"
                            ? AsyncFunction(self.fields.map(function (_a) {
                                var value = _a.value;
                                return value;
                            }))
                            : new (Function.bind.apply(Function, tslib_1.__spreadArray([void 0], self.fields.map(function (_a) {
                                var value = _a.value;
                                return value;
                            }), false)))());
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, function_1.requiredFields)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], _function.prototype, "solve", null);
    return _function;
}(function_1.AbstractAkitaFunction));
exports.default = _function;
