"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const tslib_1 = require("tslib");
const lexer_1 = require("./lexer");
const util_1 = tslib_1.__importDefault(require("./util"));
const lodash_1 = require("lodash");
class Interpreter {
    input;
    client;
    static functions = {};
    lexer;
    constructor(input, client) {
        this.input = input;
        this.client = client;
        this.lexer = new lexer_1.Lexer(input, client?.__options__?.insensitive ?? false);
        this.lexer.set_functions(Object.keys(Interpreter.functions));
    }
    static async solve_fields(data, af, i, s = 0, e) {
        for (let index = s; index < af.fields.length; index++) {
            if (e === index)
                break;
            if (i && i.includes(index))
                continue;
            af = await this.solve_field(data, af, index);
        }
        return af;
    }
    static async solve_field(data, af, index) {
        if ((0, lodash_1.isNil)(af.fields[index]))
            return af;
        const bass = data;
        for (const overload of af.fields[index].overloads) {
            data.input = af.fields[index].value;
            const finded = Interpreter.functions[overload.name], reject = await finded.solve(overload, data);
            if (reject.input) {
                af.fields[index].value = reject.input;
                af.inside = af.fields.map(f => f.value).join("|");
                af.total = `${af.name}[${af.inside}]`;
            }
        }
        data.input = bass.input;
        return af;
    }
    static add_functions(...abs_based_functions) {
        for (const abs_based_function of abs_based_functions) {
            const t = new abs_based_function();
            Interpreter.functions[t.name] = t;
        }
    }
    static async load_functions(mod) {
        for (const file of util_1.default.get_files(mod).filter(el => el.name.endsWith(".js"))) {
            const t = new (await Promise.resolve().then(() => tslib_1.__importStar(require(file.name)))).default();
            Interpreter.functions[t.name] = t;
        }
    }
    async solve(data) {
        const { input, functions_array } = this.lexer.main();
        data.parents ??= [];
        data.input = input;
        for (const af of functions_array) {
            const finded = Interpreter.functions[af.name];
            if (finded.type === "parent")
                data.parents.push(finded.name);
            try {
                data = await finded.solve(af, data);
            }
            catch (error) {
                if (data.parents.length === 0 || !data.parents.includes("@try"))
                    throw error;
                else if (data.parents.includes("@try")) {
                    data.epd = "catch";
                    data = await finded.solve(af, data);
                }
            }
            finded.type === "parent" && data.parents.pop();
            data.epd = null;
        }
        return data;
    }
}
exports.Interpreter = Interpreter;
