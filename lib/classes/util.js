"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hjson_1 = require("hjson");
const fs_1 = require("fs");
const lodash_1 = require("lodash");
class Util {
    static operators = ["==", "!=", ">=", "<=", ">", "<"];
    static falsys = ["", "0", "no", "null", "NaN", "void", "none", "false", "undefined"];
    static parse_object(to_solve, options, default_value, suppress = true) {
        try {
            return (0, hjson_1.parse)(to_solve, options);
        }
        catch (error) {
            if (!suppress)
                throw error;
            return default_value;
        }
    }
    static solve_equal(sentence) {
        return (0, lodash_1.split)(sentence, /==/g).every((value, _, self) => self[0] === value);
    }
    static solve_unequal(sentence) {
        return (0, lodash_1.split)(sentence, /!=/g).every((value, _, self) => self[0] !== value);
    }
    static solve_greater(sentence) {
        return (0, lodash_1.split)(sentence, />/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value > self[index - 1]);
    }
    static solve_greater_or_equal(sentence) {
        return (0, lodash_1.split)(sentence, />=/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value >= self[index - 1]);
    }
    static solve_less(sentence) {
        return (0, lodash_1.split)(sentence, /</g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value < self[index - 1]);
    }
    static solve_less_or_equal(sentence) {
        return (0, lodash_1.split)(sentence, /<=/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value <= self[index - 1]);
    }
    static solve_condition(sentence, suppress = true) {
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
    }
    static booleanify(str) {
        const number = Number(str);
        return isNaN(number) ? !this.falsys.includes(str) : number > 0;
    }
    static get_files(mod, result = []) {
        const files = (0, fs_1.readdirSync)(mod, { withFileTypes: true });
        for (const file of files) {
            file.name = `${mod}/${file.name}`;
            file.isDirectory() ? this.get_files(file.name, result) : result.push(file);
        }
        return result;
    }
    static interpolate_strig(field, data) {
        return field.includes("SYSTEM_RESULT")
            ? field.replace(/SYSTEM_RESULT\(\d+\)/g, m => `${data.results[m]}`)
            : field;
    }
}
exports.default = Util;
