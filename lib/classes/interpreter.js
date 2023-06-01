"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
var tslib_1 = require("tslib");
var lexer_1 = require("./lexer");
var util_1 = tslib_1.__importStar(require("./util"));
var lodash_1 = require("lodash");
var util_2 = require("util");
var __1 = require("..");
var Interpreter = (function () {
    function Interpreter(options) {
        this.options = options;
        this.lexer = new lexer_1.Lexer(options === null || options === void 0 ? void 0 : options.lexer);
        this.lexer.set_functions(Object.keys(Interpreter.functions));
    }
    Interpreter.prototype.solve_fields = function (data, af, i, s, e) {
        if (s === void 0) { s = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var index;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isNil)(af.fields))
                            return [2, af];
                        index = s;
                        _a.label = 1;
                    case 1:
                        if (!(index < af.fields.length)) return [3, 4];
                        if (e === index)
                            return [3, 4];
                        if (i && i.includes(index))
                            return [3, 3];
                        return [4, this.solve_field(data, af, index)];
                    case 2:
                        af = _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3, 1];
                    case 4: return [2, af];
                }
            });
        });
    };
    Interpreter.prototype.solve_field = function (data, af, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bass, _i, _a, overload, finded, reject, results;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((0, lodash_1.isNil)(af.fields) || (0, lodash_1.isNil)(af.fields[index]))
                            return [2, af];
                        bass = data;
                        _i = 0, _a = af.fields[index].overloads;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        overload = _a[_i];
                        data.input = af.fields[index].value;
                        finded = Interpreter.functions[overload.name];
                        return [4, finded.solve.apply(this, [overload, data])];
                    case 2:
                        reject = _b.sent();
                        if (reject.input) {
                            results = reject.input.match(/SYSTEM_RESULT\(\d+\)/g);
                            if (results) {
                                if (reject.input === results[0])
                                    af.fields[index].value = data.results[results[0]];
                                else
                                    af.fields[index].value = util_1.default.interpolate_strig(reject.input, data);
                            }
                            else
                                af.fields[index].value = reject.input;
                            af.inside = af.fields.map(function (f) { return f.value; }).join("|");
                            af.total = "".concat(af.name, "[").concat(af.inside, "]");
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        data.input = bass.input;
                        return [2, af];
                }
            });
        });
    };
    Interpreter.add_functions = function () {
        var abs_based_functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            abs_based_functions[_i] = arguments[_i];
        }
        for (var _a = 0, abs_based_functions_1 = abs_based_functions; _a < abs_based_functions_1.length; _a++) {
            var abs_based_function = abs_based_functions_1[_a];
            var t = new abs_based_function();
            Interpreter.functions[t.name] = t;
        }
    };
    Interpreter.load_core_functions = function (cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.load_functions(__1.akita_functions_mod, cb)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Interpreter.load_functions = function (mod, cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, file, t, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = util_1.default.get_files(mod).filter(function (el) {
                            return el.name.endsWith(".js");
                        });
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 8];
                        file = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        console.log("\u001b[94mReading %s...\u001b[0m", file.name);
                        return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require(file.name)); })];
                    case 3:
                        t = new (_b.sent()).default();
                        if (!cb) return [3, 5];
                        return [4, cb(t)];
                    case 4:
                        t = _b.sent();
                        _b.label = 5;
                    case 5:
                        this.functions[t.name] = t;
                        return [3, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.log("\u001b[31mThere was an error loading %s\n%s\u001b[0m", file.name, error_1.message);
                        return [3, 7];
                    case 7:
                        _i++;
                        return [3, 1];
                    case 8: return [2];
                }
            });
        });
    };
    Interpreter.prototype.resolve = function (data, af, rpr) {
        var res_id = "SYSTEM_RESULT(".concat(af._id, ")");
        data.input = data.input.replace(af.id, res_id);
        data.results[res_id] = rpr;
    };
    Interpreter.prototype.solve = function (data, debug) {
        var _a, _b, _c, _d;
        if (debug === void 0) { debug = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _e, input, functions_array, _i, functions_array_1, af, finded, error_2;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        debug &&
                            console.log("[ DEBUG ]   Gived Input\n\x1b[31m%s\x1b[0m", this.lexer.input);
                        _e = this.lexer.main(debug), input = _e.input, functions_array = _e.functions_array;
                        debug && console.log("[ DEBUG ]   Parsed\n\x1b[31m%s\x1b[0m", input);
                        (0, lodash_1.merge)(data, {
                            results: {},
                            parents: [],
                            extra: {
                                variables: {},
                            },
                            epd: null,
                            input: input,
                        });
                        debug && console.log("[ DEBUG ]   Executions\x1b[34m");
                        _i = 0, functions_array_1 = functions_array;
                        _f.label = 1;
                    case 1:
                        if (!(_i < functions_array_1.length)) return [3, 10];
                        af = functions_array_1[_i];
                        finded = Interpreter.functions[af.name];
                        if (af.prototype) {
                            if (!finded.prototypes.includes(af.prototype))
                                throw new util_1.AkitaError("".concat(af.name, " doesn't have the prototype \"").concat(af.prototype, "\""));
                            else if (finded.prototypes.length === 0)
                                throw new util_1.AkitaError("".concat(af.name, " doesn't have prototypes"));
                        }
                        if (finded.type === "parent")
                            (_a = data.parents) === null || _a === void 0 ? void 0 : _a.push(finded.name);
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 8]);
                        return [4, finded.solve.apply(this, [af, data])];
                    case 3:
                        data = _f.sent();
                        return [3, 8];
                    case 4:
                        error_2 = _f.sent();
                        if (!(((_b = data.parents) === null || _b === void 0 ? void 0 : _b.length) === 0 || !((_c = data.parents) === null || _c === void 0 ? void 0 : _c.includes("$try")))) return [3, 5];
                        throw error_2;
                    case 5:
                        if (!data.parents.includes("$try")) return [3, 7];
                        data.epd = "catch";
                        data.extra.error = error_2;
                        return [4, finded.solve.apply(this, [af, data])];
                    case 6:
                        data = _f.sent();
                        _f.label = 7;
                    case 7: return [3, 8];
                    case 8:
                        finded.type === "parent" && ((_d = data.parents) === null || _d === void 0 ? void 0 : _d.pop());
                        data.epd = null;
                        _f.label = 9;
                    case 9:
                        _i++;
                        return [3, 1];
                    case 10:
                        debug &&
                            console.log("\x1b[0m[ DEBUG ]   Final\n%s", (0, util_2.inspect)(data, { depth: null, colors: true }));
                        return [2, data];
                }
            });
        });
    };
    Interpreter.functions = {};
    return Interpreter;
}());
exports.Interpreter = Interpreter;
