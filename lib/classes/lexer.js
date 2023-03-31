"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.akitaFunction = void 0;
const lodash_1 = require("lodash");
const util_1 = require("util");
class akitaFunction {
    name;
    id;
    total;
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.total = id;
    }
    after(input) {
        return input.slice((input.match(this.id.replace(/(\(|\))/g, "\\$1"))?.index ?? 0) + this.id.length);
    }
    fields(input) {
        const fields = Lexer.lex_inside(this.after(input));
        this.total += "[" + fields.inside + "]";
        return fields;
    }
    _fields(input) {
        return Lexer.lex_inside(this.after(input));
    }
}
exports.akitaFunction = akitaFunction;
class Lexer {
    input;
    insensitive;
    regexp = null;
    functions = [];
    constructor(input, insensitive = true) {
        this.input = input;
        this.insensitive = insensitive;
        if ("string" !== typeof input)
            throw new Error("Input must be a string!");
    }
    set_functions(functions) {
        this.functions = functions.sort((a, b) => b.length - a.length);
        this.regexp = new RegExp(`(${this.functions.map(a => a.replace("$", "\\$")).join("|")})`, this.insensitive ? "gi" : "g");
        return this;
    }
    find_function(x) {
        return this.functions.find(f => (0, lodash_1.toLower)(f) === (0, lodash_1.toLower)(x));
    }
    match(input) {
        if ((0, lodash_1.isNil)(this.regexp))
            throw new Error("Expected regex value!");
        const match = input.match(this.regexp);
        return (0, lodash_1.isNil)(match) ? null : {
            name: this.insensitive ? this.find_function(match[0]) : match[0],
            pos: match.index,
            len: match[0].length,
            match: match[0]
        };
    }
    static lex_inside(after) {
        const fields = [""];
        let escape = false, closed = false, inside = "", depth = 0;
        for (const char of after.slice(1)) {
            if (escape) {
                inside += char;
                escape = false;
            }
            else if (char === "\\")
                escape = true;
            else if (char === ";") {
                fields.push("");
                inside += char;
            }
            else if (char === "]" && depth <= 0) {
                closed = true;
                break;
            }
            else if (char === "[") {
                fields[fields.length - 1] += char;
                inside += char;
                depth++;
            }
            else if (char === "]" && depth > 0) {
                fields[fields.length - 1] += char;
                inside += char;
                depth--;
            }
            else {
                fields[fields.length - 1] += char;
                inside += char;
            }
        }
        if (!closed)
            throw new SyntaxError("Missing ]");
        return { fields, inside };
    }
    lex(debug = false) {
        const functions_array = [];
        for (let index = 0, match = this.match(this.input); !(0, lodash_1.isNil)(match); match = this.match(this.input), index++) {
            if ((0, lodash_1.isNil)(match))
                continue;
            const sysfu = new akitaFunction(match.name, `SYSTEM_FUNCTION(${index})`);
            functions_array.unshift(sysfu);
            this.input = this.input.replace(match.match, sysfu.id);
        }
        debug && console.log(this.input, "\n", (0, util_1.inspect)(functions_array, { depth: null, colors: true }));
        return functions_array;
    }
}
exports.Lexer = Lexer;
