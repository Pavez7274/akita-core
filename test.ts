import { createInterface } from "readline/promises";
import { Lexer } from "./src/classes/lexer";
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
}), prompt = (msg: string) => rl.question(msg);

prompt("Give me a code:\n").then(input => {
    if (typeof input !== "string") throw Error("Invalid Code!");
    const lexer = new Lexer(input).set_functions([
        "$test", "$owo", "$totbl"
    ]);
    lexer.main(true);
    rl.close();
});

rl.on("close", () => process.exit(0));