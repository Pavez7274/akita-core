"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const lodash_1 = require("lodash");
const util_1 = require("util");
class Lexer {
    insensitive;
    regexp = null;
    functions = [];
    input = "";
    constructor(insensitive = true) {
        this.insensitive = insensitive;
    }
    set_input(n) {
        this.input = n;
    }
    set_functions(functions) {
        this.functions = functions.sort((a, b) => b.length - a.length);
        this.regexp = new RegExp(`(${this.functions.join("|")})(\\.[A-z_]+)?`, this.insensitive ? "gi" : "g");
        return this;
    }
    find_function(x) {
        return this.functions.find(f => (0, lodash_1.toLower)(f) === (0, lodash_1.toLower)(x));
    }
    match_functions() {
        if ((0, lodash_1.isNil)(this.regexp))
            throw new Error("Expected regex value!");
        const maches = this.input.matchAll(this.regexp), result = [];
        for (let i = maches.next(); !(0, lodash_1.isNil)(i); i = maches.next()) {
            if (i.done)
                break;
            result.push({
                name: this.insensitive ? this.find_function(i.value[1]) : i.value[1],
                pos: i.value.index,
                len: i.value[0].length,
                match: i.value[0],
                prototype: i.value[2]
            });
        }
        return result;
    }
    static lex_inside(after, functions_array) {
        const fields = [{ value: "", overloads: [] }];
        let escape = false, closed = false, inside = "", depth = 0;
        for (const char of after.slice(1)) {
            if (escape) {
                inside += char;
                escape = false;
            }
            else if (char === "\\")
                escape = true;
            else if (char === "|") {
                fields.push({ value: "", overloads: [] });
                inside += char;
            }
            else if (char === ")" && depth <= 0) {
                closed = true;
                break;
            }
            else if (char === "(") {
                fields[fields.length - 1].value += char;
                inside += char;
                depth++;
            }
            else if (char === ")" && depth > 0) {
                fields[fields.length - 1].value += char;
                inside += char;
                depth--;
            }
            else {
                fields[fields.length - 1].value += char;
                inside += char;
            }
        }
        for (let index = 0; index < fields.length; index++) {
            const possible_functions = fields[index].value.match(/SYSTEM_FUNCTION\(\d+\)/g);
            if (possible_functions?.length) {
                for (const possible_function of possible_functions) {
                    const pos = functions_array.findIndex(n => n.id === possible_function);
                    if (pos !== -1) {
                        fields[index].overloads.push(functions_array[pos]);
                        functions_array.splice(pos, 1);
                    }
                }
            }
        }
        if (!closed)
            throw new SyntaxError("Missing )");
        return { fields, inside, functions_array };
    }
    main(debug = false) {
        const maches = this.match_functions(), block = [];
        let input = this.input;
        for (let index = maches.length - 1; index >= 0; index--) {
            const match = maches[index], akitaFunction = {
                id: `SYSTEM_FUNCTION(${index})`,
                prototype: match.prototype,
                total: match.match,
                name: match.name,
                pos: match.pos,
                _id: index
            }, after = input.slice(match.pos + match.len);
            if (after.charAt(0) === "(") {
                const { fields, inside } = Lexer.lex_inside(after, block);
                akitaFunction.total += `(${inside})`;
                akitaFunction.inside = inside;
                akitaFunction.fields = fields;
            }
            block.unshift(akitaFunction);
            input = input.slice(0, match.pos) + akitaFunction.id + input.slice(match.pos + akitaFunction.total.length);
        }
        debug && console.log((0, util_1.inspect)(block, { depth: null, colors: true }));
        return { functions_array: block, input };
    }
}
exports.Lexer = Lexer;
