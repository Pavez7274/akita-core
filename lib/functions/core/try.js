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
        _this.type = "parent";
        _this.name = "try";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var final;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        final = true;
                        if (!(data.epd === "catch")) return [3, 2];
                        return [4, this.solve_field(data, self, 1)];
                    case 1:
                        _a.sent();
                        final = false;
                        return [3, 4];
                    case 2: return [4, this.solve_field(data, self, 0)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!(0, lodash_1.isNil)(self.fields[2])) return [3, 6];
                        return [4, this.solve_field(data, self, 2)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.resolve(data, self, final);
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
