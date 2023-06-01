import { withPrefix } from "./src";

/* eslint-disable no-undef */
import { Interpreter } from "./src/index";
import { cwd } from "process";

void (async function main() {
	await Interpreter.load_functions(cwd() + "/lib/functions/", withPrefix("$"));
	const itr = new Interpreter();
	itr.lexer.set_input("$log");
	await itr.solve({});
	await itr.solve(
		{
			extra: {
				variables: {
					great: "Hello world!",
				},
			},
		},
		true
	);
})();

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
