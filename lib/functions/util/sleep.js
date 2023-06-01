"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var promises_1 = require("timers/promises");
var lodash_1 = require("lodash");
var function_1 = require("../../classes/function");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "sleep";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        return [4, (0, promises_1.setTimeout)(Number(self.fields[0].value), lodash_1.noop)];
                    case 2:
                        _a.sent();
                        this.resolve(data, self, true);
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
