"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkitaError = void 0;
var tslib_1 = require("tslib");
var hjson_1 = require("hjson");
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var AkitaError = (function (_super) {
    tslib_1.__extends(AkitaError, _super);
    function AkitaError(msg) {
        return _super.call(this, "\u001b[41m".concat(msg, "\u001b[0m")) || this;
    }
    return AkitaError;
}(Error));
exports.AkitaError = AkitaError;
var Util = (function () {
    function Util() {
    }
    Util.parse_object = function (to_solve, options, default_value, suppress) {
        if (suppress === void 0) { suppress = true; }
        try {
            return (0, hjson_1.parse)(to_solve, options);
        }
        catch (error) {
            if (!suppress)
                throw error;
            return default_value;
        }
    };
    Util.solve_equal = function (sentence) {
        return (0, lodash_1.split)(sentence, /==/g).every(function (value, _, self) { return self[0] === value; });
    };
    Util.solve_unequal = function (sentence) {
        return (0, lodash_1.split)(sentence, /!=/g).every(function (value, _, self) { return self[0] !== value; });
    };
    Util.solve_greater = function (sentence) {
        return (0, lodash_1.split)(sentence, />/g)
            .map(function (value) { return Number(value); })
            .every(function (value, index, self) {
            return index == 0 ? true : value > self[index - 1];
        });
    };
    Util.solve_greater_or_equal = function (sentence) {
        return (0, lodash_1.split)(sentence, />=/g)
            .map(function (value) { return Number(value); })
            .every(function (value, index, self) {
            return index == 0 ? true : value >= self[index - 1];
        });
    };
    Util.solve_less = function (sentence) {
        return (0, lodash_1.split)(sentence, /</g)
            .map(function (value) { return Number(value); })
            .every(function (value, index, self) {
            return index == 0 ? true : value < self[index - 1];
        });
    };
    Util.solve_less_or_equal = function (sentence) {
        return (0, lodash_1.split)(sentence, /<=/g)
            .map(function (value) { return Number(value); })
            .every(function (value, index, self) {
            return index == 0 ? true : value <= self[index - 1];
        });
    };
    Util.solve_condition = function (sentence, suppress) {
        if (suppress === void 0) { suppress = true; }
        try {
            if (sentence.includes("=="))
                return this.solve_equal(sentence);
            else if (sentence.includes("!="))
                return this.solve_unequal(sentence);
            else if (sentence.includes(">="))
                return this.solve_greater_or_equal(sentence);
            else if (sentence.includes("<="))
                return this.solve_less_or_equal(sentence);
            else if (sentence.includes(">"))
                return this.solve_greater(sentence);
            else if (sentence.includes("<"))
                return this.solve_less(sentence);
            else
                return this.booleanify(sentence);
        }
        catch (error) {
            if (!suppress)
                throw error;
            return false;
        }
    };
    Util.booleanify = function (str) {
        var number = Number(str);
        return isNaN(number) ? !this.falsys.includes(str) : number > 0;
    };
    Util.get_files = function (mod, result) {
        if (result === void 0) { result = []; }
        var files = (0, fs_1.readdirSync)(mod, { withFileTypes: true });
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            file.name = "".concat(mod, "/").concat(file.name);
            file.isDirectory() ? this.get_files(file.name, result) : result.push(file);
        }
        return result;
    };
    Util.interpolate_strig = function (field, data) {
        return field.includes("SYSTEM_RESULT")
            ? field.replace(/SYSTEM_RESULT\(\d+\)/g, function (m) { return "".concat(data.results[m]); })
            : field;
    };
    Util.operators = [
        "==",
        "!=",
        ">=",
        "<=",
        ">",
        "<",
    ];
    Util.falsys = [
        "",
        "0",
        "no",
        "null",
        "NaN",
        "void",
        "none",
        "false",
        "undefined",
    ];
    return Util;
}());
exports.default = Util;
