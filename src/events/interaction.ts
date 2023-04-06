import { AnyInteractionGateway, InteractionTypes } from "oceanic.js";
import { Interpreter, object_data } from "../classes/interpreter";
import { AkitaClient } from "../classes/client";
import { merge } from "lodash";

export interface interactionEventOptios {
    before?: string
}
export async function interaction_create_event(int: AnyInteractionGateway, client: AkitaClient, options?: interactionEventOptios) {
    options ??= { before: undefined };
    const cmds = client.commands.filter(cmd => cmd.type === "interaction"),
        bdata = <object_data>{},
        itr = new Interpreter(client);
    if (typeof options.before === "string") {
        itr.lexer.set_input(options.before);
        merge(bdata, await itr.solve(bdata));
    }
    if (int.type === InteractionTypes.APPLICATION_COMMAND) {
        for (
            const cmd of cmds.filter(
                cmd => cmd.names.includes(
                    int.data.name.concat(" ", int.data.options.getSubCommand(false)?.[0] || "").trim()
                )
            )
        ) {
            itr.lexer.set_input(cmd.code);
            await itr.solve({ ...bdata, cmd, int, client });
        }
    } else {
        for (const cmd of cmds) {
            itr.lexer.set_input(cmd.code);
            await itr.solve({ ...bdata, cmd, int, client });
        }
    }
    if (!cmds) return;
}