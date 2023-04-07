"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction_create_event = void 0;
const oceanic_js_1 = require("oceanic.js");
const interpreter_1 = require("../classes/interpreter");
const lodash_1 = require("lodash");
async function interaction_create_event(int, client, options) {
    options ??= { before: undefined };
    const cmds = client.commands.filter(cmd => cmd.type === "interaction"), bdata = {}, itr = new interpreter_1.Interpreter(client);
    if (typeof options.before === "string") {
        itr.lexer.set_input(options.before);
        (0, lodash_1.merge)(bdata, await itr.solve(bdata));
    }
    if (int.type === oceanic_js_1.InteractionTypes.APPLICATION_COMMAND) {
        for (const cmd of cmds.filter(cmd => cmd.names.includes(int.data.name.concat(" ", int.data.options.getSubCommand(false)?.[0] || "").trim()))) {
            itr.lexer.set_input(cmd.code);
            await itr.solve({ ...bdata, cmd, int, client });
        }
    }
    else {
        for (const cmd of cmds) {
            itr.lexer.set_input(cmd.code);
            await itr.solve({ ...bdata, cmd, int, client });
        }
    }
    if (!cmds)
        return;
}
exports.interaction_create_event = interaction_create_event;
