"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var util_1 = tslib_1.__importDefault(require("./util"));
var lodash_1 = require("lodash");
var Reader = (function () {
    function Reader(interpreter) {
        this.interpreter = interpreter;
        this.exports = {};
    }
    Reader.prototype.run_dir = function (mod) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var codes, _i, codes_1, el, data;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        codes = this.read_dir(mod);
                        _i = 0, codes_1 = codes;
                        _b.label = 1;
                    case 1:
                        if (!(_i < codes_1.length)) return [3, 4];
                        el = codes_1[_i];
                        return [4, this.interpreter.solve(this.read_file(el.name), this.interpreter.lexer.default_options, {})];
                    case 2:
                        data = _b.sent();
                        if (((_a = data.extra) === null || _a === void 0 ? void 0 : _a.variables) &&
                            "export" in data.extra.variables &&
                            !(0, lodash_1.isNil)(data.extra.variables.export)) {
                            this.exports[el.name] = data.extra.variables.export;
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Reader.prototype.run_file = function (mod) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.interpreter.solve(this.read_file(mod), this.interpreter.lexer.default_options, {})];
                    case 1:
                        data = _c.sent();
                        if (((_a = data.extra) === null || _a === void 0 ? void 0 : _a.variables) &&
                            "export" in data.extra.variables &&
                            !(0, lodash_1.isNil)(data.extra.variables.export)) {
                            this.exports[mod] = data.extra.variables.export;
                        }
                        return [2, (_b = data.extra) === null || _b === void 0 ? void 0 : _b.variables.export];
                }
            });
        });
    };
    Reader.prototype.read_dir = function (mod) {
        return util_1.default.get_files(mod).filter(function (el) { return el.name.endsWith(".akita"); });
    };
    Reader.prototype.read_file = function (mod) {
        if (!mod.endsWith(".akita"))
            throw new Error("Invalid file provided, the extension must be '.akita'");
        return (0, fs_1.readFileSync)(mod, "utf8");
    };
    return Reader;
}());
exports.Reader = Reader;
