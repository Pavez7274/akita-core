"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../../classes/interpreter");
var lodash_1 = require("lodash");
var function_1 = require("../../../classes/function");
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
        _this.name = "invoke";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        this.resolve(data, self, lodash_1.invoke.apply(void 0, tslib_1.__spreadArray([data.extra.variables,
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
        (0, function_1.requiredFields)(1),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(function_1.AbstractAkitaFunction));
exports.default = default_1;
