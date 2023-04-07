"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const tslib_1 = require("tslib");
const lexer_1 = require("./lexer");
const util_1 = tslib_1.__importDefault(require("./util"));
const lodash_1 = require("lodash");
const util_2 = require("util");
class Interpreter {
    client;
    static functions = {};
    lexer;
    constructor(client) {
        this.client = client;
        this.lexer = new lexer_1.Lexer(client?.__options__?.insensitive ?? false);
        this.lexer.set_functions(Object.keys(Interpreter.functions));
    }
    async solve_fields(data, af, i, s = 0, e) {
        for (let index = s; index < af.fields.length; index++) {
            if (e === index)
                break;
            if (i && i.includes(index))
                continue;
            af = await this.solve_field(data, af, index);
        }
        return af;
    }
    async solve_field(data, af, index) {
        if ((0, lodash_1.isNil)(af.fields) || (0, lodash_1.isNil)(af.fields[index]))
            return af;
        const bass = data;
        for (const overload of af.fields[index].overloads) {
            data.input = af.fields[index].value;
            const finded = Interpreter.functions[overload.name], reject = await finded.solve.apply(this, [overload, data]);
            if (reject.input) {
                const results = reject.input.match(/SYSTEM_RESULT\(\d+\)/g);
                if (results) {
                    if (reject.input === results[0])
                        af.fields[index].value = data.results[results[0]];
                    else
                        af.fields[index].value = util_1.default.interpolate_strig(reject.input, data);
                }
                else
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
    resolve(data, af, rpr) {
        const res_id = `SYSTEM_RESULT(${af._id})`;
        data.input = data.input.replace(af.id, res_id);
        data.results[res_id] = rpr;
    }
    async solve(data, debug = false) {
        debug && console.log("[ DEBUG ]   Gived Input:\n\x1b[31m%s\x1b[0m", this.lexer.input);
        const { input, functions_array } = this.lexer.main();
        debug && console.log("[ DEBUG ]   Parsed:\n\x1b[31m%s\x1b[0m", input);
        (0, lodash_1.merge)(data, {
            results: {},
            parents: [],
            extra: {
                variables: {}
            },
            epd: null,
            input
        });
        debug && console.log("[ DEBUG ]   Executions\x1b[33m");
        for (const af of functions_array) {
            const finded = Interpreter.functions[af.name];
            if (af.prototype) {
                if (finded.prototypes.includes(af.prototype))
                    throw new Error(`${af.name} doesn't have the prototype "${af.prototype}"`);
                else if (finded.prototypes.length === 0)
                    throw new Error(`${af.name} doesn't have prototypes`);
            }
            if (finded.type === "parent")
                data.parents.push(finded.name);
            try {
                data = await finded.solve.apply(this, [af, data]);
            }
            catch (error) {
                if (data.parents.length === 0 || !data.parents.includes("@try"))
                    throw error;
                else if (data.parents.includes("@try")) {
                    data.epd = "catch";
                    data = await finded.solve.apply(this, [af, data]);
                }
            }
            finded.type === "parent" && data.parents.pop();
            data.epd = null;
        }
        debug && console.log("\x1b[0m[ DEBUG ]   Final: %s", (0, util_2.inspect)(data, { depth: null, colors: true }));
        return data;
    }
}
exports.Interpreter = Interpreter;
