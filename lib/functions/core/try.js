"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../classes/index");
var lodash_1 = require("lodash");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_in = "akita-core:try";
        _this.type = "parent";
        _this.name = "try";
        return _this;
    }
    default_1.prototype.solve = function (self, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var final;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.solve_field(data, self, 0).catch(lodash_1.noop)];
                    case 1:
                        final = _a.sent();
                        if (!(data.epd === "akita-core:catch")) return [3, 3];
                        return [4, this.solve_field(data, self, 1)];
                    case 2:
                        final = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!!(0, lodash_1.isNil)(self.fields[2])) return [3, 5];
                        return [4, this.solve_field(data, self, 2)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.resolve(data, self, final);
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
