"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.default_lexer_options = void 0;
var lodash_1 = require("lodash");
var util_1 = require("util");
exports.default_lexer_options = {
    insensitive: false,
    argument: ";",
    opener: "[",
    closer: "]",
};
var Lexer = (function () {
    function Lexer(options) {
        this.options = exports.default_lexer_options;
        this.regexp = null;
        this.functions = [];
        this.input = "";
        (0, lodash_1.merge)(this.options, options);
    }
    Lexer.prototype.set_input = function (n) {
        this.input = n;
    };
    Lexer.prototype.set_functions = function (functions) {
        this.functions = functions.sort(function (a, b) { return b.length - a.length; });
        this.regexp = new RegExp("(".concat(this.functions.map(lodash_1.escapeRegExp).join("|"), ")(\\.[a-zA-Z]+)?"), this.options.insensitive ? "gi" : "g");
        return this;
    };
    Lexer.prototype.find_function = function (x) {
        return this.functions.find(function (f) { return (0, lodash_1.toLower)(f) === (0, lodash_1.toLower)(x); });
    };
    Lexer.prototype.match_functions = function () {
        if ((0, lodash_1.isNil)(this.regexp))
            throw new Error("Expected regex value!");
        var maches = this.input.matchAll(this.regexp), result = [];
        for (var i = maches.next(); !(0, lodash_1.isNil)(i); i = maches.next()) {
            if (i.done)
                break;
            result.push({
                name: this.options.insensitive
                    ? this.find_function(i.value[1])
                    : i.value[1],
                pos: i.value.index,
                len: i.value[0].length,
                match: i.value[0],
                prototype: i.value[2],
            });
        }
        return result;
    };
    Lexer.prototype.lex_inside = function (after, functions_array) {
        var fields = [{ value: "", overloads: [] }];
        var escape = false, closed = false, inside = "", depth = 0;
        for (var _i = 0, _a = after.slice(1); _i < _a.length; _i++) {
            var char = _a[_i];
            if (escape) {
                inside += char;
                escape = false;
            }
            else if (char === "\\")
                escape = true;
            else if (char === this.options.argument) {
                fields.push({ value: "", overloads: [] });
                inside += char;
            }
            else if (char === this.options.closer && depth <= 0) {
                closed = true;
                break;
            }
            else if (char === this.options.opener) {
                fields[fields.length - 1].value += char;
                inside += char;
                depth++;
            }
            else if (char === this.options.closer && depth > 0) {
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
            var possible_functions = fields[index].value.match(/SYSTEM_FUNCTION\(\d+\)/g);
            if (possible_functions === null || possible_functions === void 0 ? void 0 : possible_functions.length) {
                var _loop_1 = function (possible_function) {
                    var pos = functions_array.findIndex(function (n) { return n.id === possible_function; });
                    if (pos !== -1) {
                        fields[index].overloads.push(functions_array[pos]);
                        functions_array.splice(pos, 1);
                    }
                };
                for (var _b = 0, possible_functions_1 = possible_functions; _b < possible_functions_1.length; _b++) {
                    var possible_function = possible_functions_1[_b];
                    _loop_1(possible_function);
                }
            }
        }
        if (!closed)
            throw new SyntaxError("Missing " + this.options.closer);
        return { fields: fields, inside: inside, functions_array: functions_array };
    };
    Lexer.prototype.main = function (debug) {
        if (debug === void 0) { debug = false; }
        var maches = this.match_functions(), block = [];
        var input = this.input;
        for (var index = maches.length - 1; index >= 0; index--) {
            var match = maches[index], akitaFunction = {
                id: "SYSTEM_FUNCTION(".concat(index, ")"),
                prototype: match.prototype,
                total: match.match,
                name: match.name,
                pos: match.pos,
                _id: index,
            }, after = input.slice(match.pos + match.len);
            if (after.charAt(0) === this.options.opener) {
                var _a = this.lex_inside(after, block), fields = _a.fields, inside = _a.inside;
                akitaFunction.total += this.options.opener + inside + this.options.closer;
                akitaFunction.inside = inside;
                akitaFunction.fields = fields;
            }
            block.unshift(akitaFunction);
            input =
                input.slice(0, match.pos) +
                    akitaFunction.id +
                    input.slice(match.pos + akitaFunction.total.length);
        }
        debug && console.log((0, util_1.inspect)(block, { depth: null, colors: true }));
        return { functions_array: block, input: input };
    };
    return Lexer;
}());
exports.Lexer = Lexer;
