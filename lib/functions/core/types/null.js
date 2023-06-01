"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var function_1 = require("../../../classes/function");
var _null = (function (_super) {
    tslib_1.__extends(_null, _super);
    function _null() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "null";
        return _this;
    }
    _null.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!self.fields) return [3, 2];
                        return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.resolve(data, self, null);
                        return [2, data];
                }
            });
        });
    };
    return _null;
}(function_1.AbstractAkitaFunction));
exports.default = _null;
