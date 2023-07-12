"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkitaError = exports.iterate = void 0;
var tslib_1 = require("tslib");
var hjson_1 = require("hjson");
var fs_1 = require("fs");
var lexer_1 = require("./lexer");
function iterate(iterator, cb) {
    var item, index = 0;
    while ((item = iterator.next())) {
        if (item.done)
            break;
        cb(item.value, index++, iterator);
    }
}
exports.iterate = iterate;
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
        return field.includes("SAR")
            ? field.replace(lexer_1.Lexer.SAR_EXPRESSION, function (m) { return "".concat(data.results[m]); })
            : field;
    };
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
