"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const tslib_1 = require("tslib");
const util_1 = tslib_1.__importDefault(require("./util"));
class Field {
    string;
    constructor(string) {
        this.string = string;
    }
    solve_as_string() {
        return `"${this.string.replace(/"/g, "\\\"")}"`;
    }
    solve_as_boolean() {
        return util_1.default.booleanify(this.string);
    }
    solve_as_number() {
        return Number(this.string);
    }
    _solve() {
        return;
    }
}
exports.Field = Field;
