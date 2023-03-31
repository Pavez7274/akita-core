"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transpiler = void 0;
const tslib_1 = require("tslib");
const lexer_1 = require("./lexer");
const util_1 = tslib_1.__importDefault(require("./util"));
class Transpiler {
    input;
    client;
    static functions = {};
    lexer;
    constructor(input, client) {
        this.input = input;
        this.client = client;
        this.lexer = new lexer_1.Lexer(this.input, client?.__options__.insensitive);
        this.lexer.set_functions(Object.keys(Transpiler.functions));
    }
    static async load_functions(mod) {
        for (const file of util_1.default.get_files(mod).filter(el => el.name.endsWith(".js"))) {
            const t = new (await Promise.resolve().then(() => tslib_1.__importStar(require(file.name)))).default();
            Transpiler.functions[t.name] = t;
        }
    }
    async parse(data = { input: this.input, imports: "", returns: {} }) {
        console.log("[ DEBUG ] Provided code:", data.input ?? this.input);
        const arr = this.lexer.lex();
        data.input = this.lexer.input;
        data.imports ??= "";
        data.returns ??= {};
        for (const akitaFunction of arr) {
            const finded = Transpiler.functions[akitaFunction.name];
            data = await finded.solve(akitaFunction, data);
        }
        console.log(data);
    }
}
exports.Transpiler = Transpiler;
