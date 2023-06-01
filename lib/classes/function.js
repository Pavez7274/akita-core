"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidAkitaFunction = exports.AbstractAkitaFunction = exports.requiredFields = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var util_1 = require("./util");
function requiredFields(min) {
    if (min === void 0) { min = Infinity; }
    return function (target, propertyKey, descriptor) {
        descriptor.value = function (self, data) {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_d) {
                    if ((0, lodash_1.isNil)(self.fields) || (min !== Infinity && self.fields.length < min)) {
                        if (min !== Infinity) {
                            throw new util_1.AkitaError((0, lodash_1.isNil)((_a = self.fields) === null || _a === void 0 ? void 0 : _a.length)
                                ? "".concat(self.name, " requires ").concat(min, " fields but didn't get any instead!")
                                : "".concat(self.name, " requires ").concat(min, " fields but instead received ").concat((_c = (_b = self.fields) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, "!"));
                        }
                        else
                            throw new util_1.AkitaError("".concat(self.name, " requires brackets!"));
                    }
                    return [2, target[propertyKey].apply(this, [self, data])];
                });
            });
        };
        return descriptor;
    };
}
exports.requiredFields = requiredFields;
var AbstractAkitaFunction = (function () {
    function AbstractAkitaFunction() {
        this.type = "unknown";
        this.prototypes = [];
    }
    return AbstractAkitaFunction;
}());
exports.AbstractAkitaFunction = AbstractAkitaFunction;
var VoidAkitaFunction = (function (_super) {
    tslib_1.__extends(VoidAkitaFunction, _super);
    function VoidAkitaFunction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "undefined";
        return _this;
    }
    VoidAkitaFunction.prototype.solve = function () {
        throw new Error("void function");
    };
    return VoidAkitaFunction;
}(AbstractAkitaFunction));
exports.VoidAkitaFunction = VoidAkitaFunction;
