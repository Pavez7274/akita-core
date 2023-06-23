"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../../classes/index");
var lodash_1 = require("lodash");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:number";
        _this.name = "number";
        _this.prototypes = [
            ".POSITIVE_INFINITY",
            ".NEGATIVE_INFINITY",
            ".MAX_SAFE_INTEGER",
            ".MIN_SAFE_INTEGER",
            ".MAX_VALUE",
            ".MIN_VALUE",
            ".EPSILON",
            ".NaN",
            ".parseInt",
            ".parseFloat",
            ".isSafeInteger",
            ".isInteger",
            ".isFinite",
            ".isNaN",
        ];
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if ((0, lodash_1.isNil)(self.inside) || (0, lodash_1.isNil)(self.fields))
                    this.resolve(data, self, Number);
                else {
                    if (typeof self.prototype === "string" &&
                        (0, lodash_1.isFunction)((0, lodash_1.get)(Number, self.prototype.slice(1))))
                        this.resolve(data, self, lodash_1.invoke.apply(void 0, tslib_1.__spreadArray([Number,
                            self.prototype.slice(1)], self.fields.map(function (_a) {
                            var value = _a.value;
                            return value;
                        }), false)));
                    else if ((0, lodash_1.isNil)(self.prototype))
                        this.resolve(data, self, Number(self.inside));
                    else
                        this.resolve(data, self, (0, lodash_1.get)(Number, self.prototype.slice(1)));
                }
                return [2, data];
            });
        });
    };
    return default_1;
}(index_1.AbstractAkitaFunction));
exports.default = default_1;
