/* eslint-disable no-undef */
const { Transpiler } = require("./lib/classes/transpiler");
const { cwd } = require("process");

void async function main() {
    await Transpiler.load_functions(cwd() + "/lib/functions/");
    // console.log(Object.values(Transpiler.functions).map(n => n.solve.toString()));
    const tsr = new Transpiler("$sleep[30_000; $log[hi, i sleep 30s]]");
    await tsr.parse();
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