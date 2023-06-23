"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../classes/index");
var REGULAR_EXPRESSION = /^\/(.+?)\/(\w*)?$/g;
var ReplaceAkitaFunction = (function (_super) {
    tslib_1.__extends(ReplaceAkitaFunction, _super);
    function ReplaceAkitaFunction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:replace";
        _this.name = "replace";
        return _this;
    }
    ReplaceAkitaFunction.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, text, match, replacer, _b, $1, $2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _c.sent();
                        this.resolve(data, self, true);
                        _a = self.fields, text = _a[0], match = _a[1], replacer = _a[2];
                        text.value = String(text.value);
                        match.value = String(match.value);
                        if (REGULAR_EXPRESSION.test(match.value)) {
                            _b = Array.from(text.value.matchAll(REGULAR_EXPRESSION))[0], $1 = _b[1], $2 = _b[2];
                            this.resolve(data, self, text.value.replace(new RegExp($1, $2), replacer.value));
                        }
                        else {
                            this.resolve(data, self, text.value.replace(match.value, replacer.value));
                        }
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, index_1.requiredFields)(3),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [index_1.LexerAkitaFunction, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ReplaceAkitaFunction.prototype, "solve", null);
    return ReplaceAkitaFunction;
}(index_1.AbstractAkitaFunction));
exports.default = ReplaceAkitaFunction;
