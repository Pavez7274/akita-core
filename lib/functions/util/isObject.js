"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../classes/index");
var util_1 = tslib_1.__importDefault(require("../../classes/util"));
var lodash_1 = require("lodash");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:is_object";
        _this.name = "isObject";
        _this.prototypes = [".like"];
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var x, t;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        if (self.prototype === ".like") {
                            x = util_1.default.parse_object(self.fields[0].value), t = util_1.default.parse_object(self.fields[1].value);
                            if ((0, lodash_1.isObjectLike)(x) && (0, lodash_1.isObjectLike)(t))
                                this.resolve(data, self, (0, lodash_1.isEqual)((0, lodash_1.keys)(x), (0, lodash_1.keys)(t)));
                            else
                                this.resolve(data, self, false);
                        }
                        else
                            this.resolve(data, self, (0, lodash_1.isObjectLike)(util_1.default.parse_object(self.inside)));
                        return [2, data];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, index_1.requiredFields)(2),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [index_1.LexerAkitaFunction, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], default_1.prototype, "solve", null);
    return default_1;
}(index_1.AbstractAkitaFunction));
exports.default = default_1;
