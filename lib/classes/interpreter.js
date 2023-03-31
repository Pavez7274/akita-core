"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const old_lexer_1 = require("./old_lexer");
class Interpreter {
    input;
    client;
    functions = {};
    lexer;
    constructor(input, client) {
        this.input = input;
        this.client = client;
        this.lexer = new old_lexer_1.Lexer(input, client.__options__.insensitive);
    }
    parse(data) {
        const { input, functions_array } = this.lexer.main();
        data.input = input;
        for (const akitaFunction of functions_array) {
            data = this.functions[akitaFunction.name].apply(this, [data]);
        }
    }
}
exports.Interpreter = Interpreter;
