/* eslint-disable no-undef */
const { Interpreter } = require("./lib/classes/interpreter");
const { cwd } = require("process");

void async function main() {
    await Interpreter.load_functions(cwd() + "/lib/functions/");
    // console.log(Object.values(Transpiler.functions).map(n => n.solve.toString()));
    const itr = new Interpreter("@try(@throw(hola)|@log(lol)|@log(finally hi))");
    console.log(await itr.solve({ input: "" }));
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