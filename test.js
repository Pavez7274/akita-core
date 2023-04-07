/* eslint-disable no-undef */
const { Interpreter } = require("./lib/classes/interpreter");
const { cwd } = require("process");

void async function main() {
    await Interpreter.load_functions(cwd() + "/lib/functions/");
    // console.log(Object.values(Transpiler.functions).map(n => n.solve.toString()));
    const itr = new Interpreter(null);
    itr.lexer.set_input(
`@set(obj|@object({ a: "teamoinu", c: 2 }))
@set(obj.b|@function(return arguments[0] + 1))
@log(@get(obj.a))
@log(@get(obj.b))
@log(@get(obj.b|@null|@get(obj.c)))
@log(@get.invoke(obj.b|@get(obj.c)))`
        );
    await itr.solve({}, true);
}();

// import { createInterface } from "readline/promises";
// import { Lexer } from "./src/classes/old_lexer";
// const rl = createInterface({
//     input: process.stdin,
//     output: process.stdout
// }), prompt = (msg: string) => rl.question(msg);

// prompt("Give me a code:\n").then(input => {
//     if (typeof input !== "string") throw Error("Invalid Code!");
//     const lexer = new Lexer(input).set_functions([
//         "$test", "$owo", "$totbl"
//     ]);
//     lexer.main(true);
//     rl.close();
// });

// rl.on("close", () => process.exit(0));