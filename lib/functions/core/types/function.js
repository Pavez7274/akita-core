"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_1 = require("../../../classes");
var AsyncFunction = function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            null;
            return [2];
        });
    });
}.constructor;
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:function";
        _this.name = "function";
        _this.prototypes = [".async"];
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
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
        (0, classes_1.requiredFields)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [classes_1.LexerAkitaFunction, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(classes_1.AbstractAkitaFunction));
exports.default = default_1;
