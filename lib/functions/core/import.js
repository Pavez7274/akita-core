"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var interpreter_1 = require("../../classes/interpreter");
var function_1 = require("../../classes/function");
var lodash_1 = require("lodash");
var util_1 = tslib_1.__importDefault(require("../../classes/util"));
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "import";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var r, x, x, key;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _a.sent();
                        r = util_1.default.parse_object(self.fields[1].value);
                        if (!(0, lodash_1.isNil)(r)) return [3, 3];
                        return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require(self.fields[1].value)); })];
                    case 2:
                        x = _a.sent();
                        (0, lodash_1.set)(data.extra.variables, self.fields[0].value, x);
                        return [3, 5];
                    case 3: return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require(self.fields[1].value)); })];
                    case 4:
                        x = _a.sent();
                        for (key in r) {
                            (0, lodash_1.set)(data.extra.variables, key, x[key]);
                        }
                        _a.label = 5;
                    case 5:
                        this.resolve(data, self, void 0);
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
