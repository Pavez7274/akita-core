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
        _this.name_in = "akita-core:import";
        _this.name = "import";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, key, mod, r, imported, _b, prop;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.solve_fields(data, self)];
                    case 1:
                        _c.sent();
                        _a = self.fields.map(function (_a) {
                            var value = _a.value;
                            return value;
                        }), key = _a[0], mod = _a[1];
                        r = util_1.default.parse_object(key);
                        if (!mod.endsWith(".akita")) return [3, 3];
                        return [4, this.reader.run_file(mod)];
                    case 2:
                        _b = _c.sent();
                        return [3, 5];
                    case 3: return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require(mod)); })];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        imported = _b;
                        if ((0, lodash_1.isNil)(r)) {
                            (0, lodash_1.set)(data.extra.variables, key, imported);
                        }
                        else {
                            for (prop in r) {
                                (0, lodash_1.set)(data.extra.variables, prop, imported[key]);
                            }
                        }
                        this.resolve(data, self, void 0);
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
