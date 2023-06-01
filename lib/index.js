"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrefix = exports.akita_functions_mod = exports.util_functions_mod = exports.core_functions_mod = void 0;
var tslib_1 = require("tslib");
var process_1 = require("process");
tslib_1.__exportStar(require("./classes/index"), exports);
exports.core_functions_mod = (0, process_1.cwd)().concat("/functions/core/");
exports.util_functions_mod = (0, process_1.cwd)().concat("/functions/util/");
exports.akita_functions_mod = (0, process_1.cwd)().concat("/functions/");
function withPrefix(prefix) {
    var _this = this;
    return function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            t.name = prefix.concat(t.name);
            return [2, t];
        });
    }); };
}
exports.withPrefix = withPrefix;
