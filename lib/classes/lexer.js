"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.LexerAkitaFunction = exports.LexerError = exports.Operators = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var util_1 = require("util");
var Operators;
(function (Operators) {
    Operators["=="] = "equal";
    Operators["==="] = "strict equal";
    Operators["!="] = "not equal";
    Operators["!=="] = "strict not equal";
    Operators[">"] = "greater";
    Operators["<"] = "lesser";
    Operators[">="] = "greater or equal";
    Operators["<="] = "lesser or equal";
    Operators["="] = "assign";
})(Operators = exports.Operators || (exports.Operators = {}));
var LexerError = (function (_super) {
    tslib_1.__extends(LexerError, _super);
    function LexerError(property, header, explain) {
        var _this = _super.call(this, "\u001B[34m[Lexer.".concat(property, "]\u001B[0m-> \u001B[31m").concat(header, "\n\t\u001B[90m").concat(explain, "\u001B[0m")) || this;
        _this.name = "LexerError";
        return _this;
    }
    return LexerError;
}(Error));
exports.LexerError = LexerError;
var LexerAkitaFunction = (function () {
    function LexerAkitaFunction(options, matched, uid) {
        this.options = options;
        this.matched = matched;
        this.uid = uid;
        this.fields = [];
    }
    Object.defineProperty(LexerAkitaFunction.prototype, "identifier", {
        get: function () {
            return "SAF(".concat(this.uid, ")");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LexerAkitaFunction.prototype, "position", {
        get: function () {
            return this.matched.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LexerAkitaFunction.prototype, "name", {
        get: function () {
            return this.matched.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LexerAkitaFunction.prototype, "prototype", {
        get: function () {
            return this.matched.prototype;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LexerAkitaFunction.prototype, "inside", {
        get: function () {
            return this.fields.map(function (n) { return n.value; }).join(this.options.argument);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LexerAkitaFunction.prototype, "total", {
        get: function () {
            var _a;
            return this.matched.name.concat((_a = this.matched.prototype) !== null && _a !== void 0 ? _a : "", this.inside
                ? this.options.opener.concat(this.inside, this.options.closer)
                : "");
        },
        enumerable: false,
        configurable: true
    });
    LexerAkitaFunction.prototype.toJSON = function () {
        return {
            identifier: this.identifier,
            position: this.position,
            fields: this.fields.map(function (saf) {
                saf.overloads = saf.overloads.map(function (_) { return _.toJSON(); });
                return saf;
            }),
            name: this.name,
        };
    };
    return LexerAkitaFunction;
}());
exports.LexerAkitaFunction = LexerAkitaFunction;
var Lexer = (function () {
    function Lexer(default_options) {
        if (default_options === void 0) { default_options = {
            insensitive: false,
            argument: ";",
            opener: "(",
            closer: ")",
        }; }
        this.default_options = default_options;
        this.regular_expression = "";
        this.functions = [];
    }
    Lexer.generateToken = function () {
        var timestamp = Date.now().toString(36), random = Math.random().toString(36).substring(2, 9), token = timestamp + random;
        return token;
    };
    Lexer.prototype.set_functions = function (functions) {
        this.functions = functions.sort(function (a, b) { return b.length - a.length; });
        this.regular_expression = "(".concat(this.functions
            .map(lodash_1.escapeRegExp)
            .join("|"), ")(\\.[a-zA-Z]+)?");
        return this;
    };
    Lexer.prototype.find_function = function (x) {
        return this.functions.find(function (f) { return (0, lodash_1.toLower)(f) === (0, lodash_1.toLower)(x); });
    };
    Lexer.prototype.match_functions = function (input, options) {
        var _this = this;
        var _a;
        if ((0, lodash_1.isNil)(this.regular_expression) || (0, lodash_1.isEmpty)(this.regular_expression))
            throw new LexerError("match_functions", "Expected regular expression value!", "The Lexer expected a value for the regular expression (Lexer.regular_expression) but instead an empty string or a falsy value was provided");
        var insensitive = (_a = options.insensitive) !== null && _a !== void 0 ? _a : this.default_options;
        return Array.from(input.matchAll(new RegExp(this.regular_expression, insensitive ? "gi" : "g")), function (k) { return ({
            prototype: k[2],
            position: Number(k.index),
            length: k[0].length,
            match: k[0],
            name: insensitive ? _this.find_function(k[1]) : k[1],
        }); });
    };
    Lexer.prototype.inside = function (options, after, block) {
        var fields = [
            { overloads: [], value: "" },
        ];
        var escape = false;
        var closed = false;
        var inside = "";
        var depth = 0;
        for (var i = 1; i < after.length; i++) {
            var char = after[i];
            if (escape) {
                inside += char;
                escape = false;
            }
            else if (char === "\\") {
                escape = true;
            }
            else if (char === options.argument) {
                fields.push({ overloads: [], value: "" });
                inside += char;
            }
            else if (char === options.closer && depth <= 0) {
                closed = true;
                break;
            }
            else if (char === options.opener) {
                fields[fields.length - 1].value += char;
                inside += char;
                depth++;
            }
            else if (char === options.closer && depth > 0) {
                fields[fields.length - 1].value += char;
                inside += char;
                depth--;
            }
            else {
                fields[fields.length - 1].value += char;
                inside += char;
            }
        }
        for (var index = 0; index < fields.length; index++) {
            var overloads = fields[index].value.match(Lexer.SAF_EXPRESSION);
            if (overloads && overloads.length > 0) {
                var _loop_1 = function (overload) {
                    var maybe = block.findIndex(function (saf) { return saf.identifier === overload; });
                    if (maybe !== -1) {
                        fields[index].overloads.push(block[maybe]);
                        block.splice(maybe, 1);
                    }
                };
                for (var _i = 0, overloads_1 = overloads; _i < overloads_1.length; _i++) {
                    var overload = overloads_1[_i];
                    _loop_1(overload);
                }
            }
        }
        if (!closed) {
            throw new LexerError("Lexer.inside", "Missing closer!", "The Lexer expected the same or greater number of closers than openers");
        }
        return { fields: fields, inside: inside, block: block };
    };
    Lexer.prototype.lex = function (input, options, debug) {
        if (options === void 0) { options = {}; }
        if (debug === void 0) { debug = false; }
        input = this.resolve(input, options);
        if (debug)
            console.log("\n", input);
        options = (0, lodash_1.merge)(options, this.default_options);
        var matches = this.match_functions(input, options);
        var block = [];
        for (var index = matches.length - 1; index > -1; index--) {
            var saf = new LexerAkitaFunction(options, matches[index], Lexer.generateToken());
            var after = input.slice(saf.position + saf.total.length);
            if (after.charAt(0) === options.opener) {
                var _a = this.inside(options, after, block), iblock = _a.block, fields = _a.fields;
                block = iblock;
                saf.fields = fields;
            }
            block.unshift(saf);
            input = input
                .slice(0, saf.position)
                .concat(saf.identifier, input.slice(saf.position + saf.total.length));
            if (debug)
                console.log("\n", input);
        }
        if (debug) {
            console.log((0, util_1.inspect)(block.map(function (saf) { return saf.toJSON(); }), { depth: null, colors: true }));
        }
        return { block: block, input: input };
    };
    Lexer.prototype.resolve = function (input, _a) {
        var opener = _a.opener, closer = _a.closer, argument = _a.argument;
        argument !== null && argument !== void 0 ? argument : (argument = this.default_options.argument);
        opener !== null && opener !== void 0 ? opener : (opener = this.default_options.opener);
        closer !== null && closer !== void 0 ? closer : (closer = this.default_options.closer);
        for (var _i = 0, _b = Array.from(input.matchAll(Lexer.CONDITION_EXPRESSION), function (match) { return [match[0], match[1], match[4], match[5]]; }); _i < _b.length; _i++) {
            var _c = _b[_i], match = _c[0], left = _c[1], symbol = _c[2], right = _c[3];
            switch (symbol) {
                case "==":
                case "===":
                case "!=":
                case "!==":
                case ">":
                case "<":
                case ">=":
                case "<=":
                    input = input.replace(match, "akita-core:condition(".concat(Operators[symbol]).concat(argument).concat(left, ";").concat(right, ")"));
                    continue;
                case "=":
                    input = input.replace(match, "akita-core:set".concat(opener).concat(left).concat(argument).concat(right).concat(closer));
                    continue;
                default:
                    continue;
            }
        }
        return input;
    };
    Lexer.CONDITION_EXPRESSION = /([^()\s;]+(\([^)]*\))?)(\s*([=!<>]+)\s*)([^()\s;]+(\([^)]*\))?)/g;
    Lexer.SAF_EXPRESSION = /^SAF\([a-z0-9]{15}\)$/g;
    Lexer.SAR_EXPRESSION = /^SAR\([a-z0-9]{15}\)$/g;
    return Lexer;
}());
exports.Lexer = Lexer;
