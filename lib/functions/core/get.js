"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var lodash_1 = require("lodash");
var function_1 = require("../../classes/function");
function _(object, key) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    var res = (0, lodash_1.get)(object, key, rest[0]);
    return (0, lodash_1.isFunction)(res) && rest.length > 1
        ? res.apply(rest[0], rest.slice(1))
        : (0, lodash_1.result)(object, key, rest[0]);
}
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "get";
        _this.prototypes = [".strict", ".invoke"];
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _b.sent();
                        if (self.prototype === ".strict")
                            this.resolve(data, self, (0, lodash_1.get)(data.extra.variables, self.fields[0].value, (_a = self.fields[1]) === null || _a === void 0 ? void 0 : _a.value));
                        else if (self.prototype === ".invoke")
                            this.resolve(data, self, lodash_1.invoke.apply(void 0, tslib_1.__spreadArray([data.extra.variables,
                                self.fields[0].value], self.fields.slice(1).map(function (_a) {
                                var value = _a.value;
                                return value;
                            }), false)));
                        else
                            this.resolve(data, self, _.apply(void 0, tslib_1.__spreadArray([data.extra.variables,
                                self.fields[0].value], self.fields.slice(1).map(function (_a) {
                                var value = _a.value;
                                return value;
                            }), false)));
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
    ], default_1.prototype, "solve", null);
    return default_1;
}(function_1.AbstractAkitaFunction));
exports.default = default_1;
