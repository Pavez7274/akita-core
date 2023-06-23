"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_1 = require("../../../classes");
var lodash_1 = require("lodash");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:if";
        _this.name = "if";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.solve_field(data, self, 0)];
                    case 1:
                        _b.sent();
                        if (self.fields[0].value) {
                            this.solve_field(data, self, 1);
                            this.resolve(data, self, self.fields[1].value);
                        }
                        else if ((0, lodash_1.isNil)((_a = self.fields[2]) === null || _a === void 0 ? void 0 : _a.value)) {
                            this.solve_field(data, self, 2);
                            this.resolve(data, self, self.fields[2].value);
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
