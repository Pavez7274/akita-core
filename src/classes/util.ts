import { parse, DeserializeOptions } from "hjson";
import { split } from "lodash";

export class Util {
    static readonly operators = [/*"===", "!==",*/ "==", "!=", ">=", "<=", ">", "<"];
    static readonly falsys = ["", "0", "no", "null", "NaN", "void", "none", "false", "undefined"];
    static parse_object(to_solve: string, options?: DeserializeOptions, default_value?: object, suppress = true) {
        try {
            return parse(to_solve, options) as object;
        } catch (error) {
            if (!suppress) throw error;
            return default_value;
        }
    }
    static solve_equal(sentence: string) {
        return split(sentence, /==/g).every((value, _, self) => self[0] === value);
    }
    static solve_unequal(sentence: string) {
        return split(sentence, /!=/g).every((value, _, self) => self[0] !== value);
    }
    static solve_greater(sentence: string) {
        return split(sentence, />/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value > self[index - 1]);
    }
    static solve_greater_or_equal(sentence: string) {
        return split(sentence, />=/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value >= self[index - 1]);
    }
    static solve_less(sentence: string) {
        return split(sentence, /</g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value < self[index - 1]);
    }
    static solve_less_or_equal(sentence: string) {
        return split(sentence, /<=/g)
            .map(value => Number(value))
            .every((value, index, self) => index == 0 ? true : value <= self[index - 1]);
    }
    static solve_condition(sentence: string, suppress = true) {
        try {
            if (sentence.includes("==")) return this.solve_equal(sentence);
            else if (sentence.includes("!=")) return this.solve_unequal(sentence);
            else if (sentence.includes(">=")) return this.solve_greater_or_equal(sentence);
            else if (sentence.includes("<=")) return this.solve_less_or_equal(sentence);
            else if (sentence.includes(">")) return this.solve_greater(sentence);
            else if (sentence.includes("<")) return this.solve_less(sentence);
            else return this.booleanify(sentence);
        } catch (error) {
            if (!suppress) throw error;
            return false;
        }
    }
    static booleanify(str: string) {
        const number = Number(str);
        return isNaN(number) ? !this.falsys.includes(str) : number > 0;
    }
}