import { Client, ClientOptions } from "oceanic.js";
import { interactionEventOptios, interaction_create_event } from "../events/interaction";

export type akitaClientOptions = ClientOptions & {
    prefix?: string | string[]
    insensitive?: boolean
}

export type command = {
    names: string[]
    type: string
    code: string
}

export class AkitaClient extends Client {
    public commands: command[] = [];
    public prefix: string | string[] | null = null;
    constructor(public readonly __options__: akitaClientOptions) {
        super(__options__);
        this.prefix = __options__.prefix ?? null;
    }
    public add_commands(...commands: command[]) {
        this.commands.push(...commands);
    }
    public on_interaction_create (options: interactionEventOptios) {
        this.on("interactionCreate", int => interaction_create_event(int, this, options));
    }
}