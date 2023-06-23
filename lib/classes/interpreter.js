"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
var tslib_1 = require("tslib");
var lexer_1 = require("./lexer");
var lodash_1 = require("lodash");
var util_1 = tslib_1.__importStar(require("./util"));
var __1 = require("..");
var util_2 = require("util");
var Interpreter = (function () {
    function Interpreter(options) {
        this.options = options;
        this.lexer = new lexer_1.Lexer(options === null || options === void 0 ? void 0 : options.lexer);
        this.lexer.set_functions(Interpreter.functions
            .map(function (abs) {
            var r = [abs.name];
            abs.name_in && r.push(abs.name_in);
            return r;
        })
            .flat(1));
    }
    Interpreter.prototype.solve_fields = function (data, saf, i, s, e) {
        if (s === void 0) { s = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var index;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, lodash_1.isNil)(saf.fields) || (0, lodash_1.isEmpty)(saf.fields))
                            return [2, saf];
                        index = s;
                        _a.label = 1;
                    case 1:
                        if (!(index < saf.fields.length)) return [3, 4];
                        if (e === index)
                            return [3, 4];
                        if (i && i.includes(index))
                            return [3, 3];
                        return [4, this.solve_field(data, saf, index)];
                    case 2:
                        saf = _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3, 1];
                    case 4: return [2, saf];
                }
            });
        });
    };
    Interpreter.prototype.solve_field = function (data, saf, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bass, _loop_1, this_1, _i, _a, overload;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((0, lodash_1.isNil)(saf.fields) || (0, lodash_1.isEmpty)(saf.fields) || (0, lodash_1.isNil)(saf.fields[index]))
                            return [2, saf];
                        bass = data;
                        _loop_1 = function (overload) {
                            var finded, reject, results;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        data.input = saf.fields[index].value;
                                        finded = Interpreter.functions.find(function (n) { return n.name_in === overload.name || n.name === overload.name; });
                                        return [4, finded.solve.apply(this_1, [overload, data])];
                                    case 1:
                                        reject = _c.sent();
                                        if (reject.input) {
                                            results = reject.input.match(lexer_1.Lexer.SAR_EXPRESSION);
                                            if (results) {
                                                if (reject.input === results[0])
                                                    saf.fields[index].value = data.results[results[0]];
                                                else
                                                    saf.fields[index].value = util_1.default.interpolate_strig(reject.input, data);
                                            }
                                            else
                                                saf.fields[index].value = reject.input;
                                        }
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = saf.fields[index].overloads;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        overload = _a[_i];
                        return [5, _loop_1(overload)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        data.input = bass.input;
                        return [2, saf];
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
            var abs = new abs_based_function();
            Interpreter.functions.push(abs);
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
            var _i, _a, file, abs, error_1;
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
                        return [4, Promise.resolve().then(function () { return tslib_1.__importStar(require(file.name)); })];
                    case 3:
                        abs = new (_b.sent()).default();
                        if (!cb) return [3, 5];
                        return [4, cb(abs)];
                    case 4:
                        abs = _b.sent();
                        _b.label = 5;
                    case 5:
                        this.functions.push(abs);
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
    Interpreter.prototype.resolve = function (data, saf, rpr) {
        var res_id = "SAR(".concat(saf.uid, ")");
        data.input = data.input.replace(saf.identifier, res_id);
        data.results[res_id] = rpr;
    };
    Interpreter.prototype.solve = function (input, options, data, debug) {
        var _a, _b;
        if (debug === void 0) { debug = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _c, linput, block, _loop_2, this_2, _i, block_1, saf;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (((0, lodash_1.isObject)(debug) && debug.gived_input) || debug === true)
                            console.log("\u001B[44m[ DEBUG ]\u001B[0m Gived Input  \u001B[90m".concat(new Date().toLocaleString(), "\n\u001B[31m%s\u001B[0m\n"), input);
                        _c = this.lexer.lex(input, options, (0, lodash_1.isObject)(debug) ? debug.lexer : debug), linput = _c.input, block = _c.block;
                        input = linput;
                        if (((0, lodash_1.isObject)(debug) && debug.parsed_input) || debug === true)
                            console.log("\u001B[44m[ DEBUG ]\u001B[0m Parsed  \u001B[90m".concat(new Date().toLocaleString(), "\n\u001B[31m%s\u001B[0m\n"), input);
                        (0, lodash_1.merge)(data, {
                            results: {},
                            parents: [],
                            extra: {
                                variables: {},
                            },
                            epd: null,
                            input: input,
                        });
                        if (((0, lodash_1.isObject)(debug) && debug.executions) || debug === true)
                            console.log("\u001B[44m[ DEBUG ]\u001B[0m Executions  \u001B[90m".concat(new Date().toLocaleString(), "\u001B[34m"));
                        _loop_2 = function (saf) {
                            var finded, error_2;
                            return tslib_1.__generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        finded = Interpreter.functions.find(function (f) { return f.name_in === saf.name || f.name === saf.name; });
                                        if ((0, lodash_1.isNil)(finded))
                                            return [2, "continue"];
                                        if (saf.prototype) {
                                            if (!finded.prototypes.includes(saf.prototype))
                                                throw new util_1.AkitaError("".concat(saf.name, " doesn't have the prototype \"").concat(saf.prototype, "\""));
                                            else if (finded.prototypes.length === 0)
                                                throw new util_1.AkitaError("".concat(saf.name, " doesn't have prototypes"));
                                        }
                                        if (finded.type === "parent")
                                            (_a = data.parents) === null || _a === void 0 ? void 0 : _a.push(finded.name_in || finded.name);
                                        _e.label = 1;
                                    case 1:
                                        _e.trys.push([1, 3, , 7]);
                                        return [4, finded.solve.apply(this_2, [saf, data])];
                                    case 2:
                                        data = _e.sent();
                                        return [3, 7];
                                    case 3:
                                        error_2 = _e.sent();
                                        if (!(finded.name_in === "akita-core:try")) return [3, 5];
                                        data.extra.error = error_2;
                                        return [4, finded.solve.apply(this_2, [saf, data])];
                                    case 4:
                                        data = _e.sent();
                                        return [3, 6];
                                    case 5: throw error_2;
                                    case 6: return [3, 7];
                                    case 7:
                                        finded.type === "parent" && ((_b = data.parents) === null || _b === void 0 ? void 0 : _b.pop());
                                        data.epd = null;
                                        return [2];
                                }
                            });
                        };
                        this_2 = this;
                        _i = 0, block_1 = block;
                        _d.label = 1;
                    case 1:
                        if (!(_i < block_1.length)) return [3, 4];
                        saf = block_1[_i];
                        return [5, _loop_2(saf)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        if (((0, lodash_1.isObject)(debug) && debug.executions) || debug === true)
                            console.log("\u001b[0m\n");
                        if (((0, lodash_1.isObject)(debug) && debug.final) || debug === true) {
                            console.log("\u001B[44m[ DEBUG ]\u001B[0m Final  \u001B[90m".concat(new Date().toLocaleString(), "\n\u001B[0m%s\n"), (0, util_2.inspect)(data, {
                                depth: (0, lodash_1.isObject)(debug) && (0, lodash_1.isObject)(debug.final) ? debug.final.depth : null,
                                colors: true,
                            }));
                        }
                        return [2, data];
                }
            });
        });
    };
    Interpreter.functions = [];
    return Interpreter;
}());
exports.Interpreter = Interpreter;
