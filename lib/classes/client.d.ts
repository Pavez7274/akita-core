import { Client, ClientOptions } from "oceanic.js";
import { interactionEventOptios } from "../events/interaction";
export declare type akitaClientOptions = ClientOptions & {
    prefix?: string | string[];
    insensitive?: boolean;
};
export declare type command = {
    names: string[];
    type: string;
    code: string;
};
export declare class AkitaClient extends Client {
    readonly __options__: akitaClientOptions;
    commands: command[];
    prefix: string | string[] | null;
    constructor(__options__: akitaClientOptions);
    add_commands(...commands: command[]): void;
    on_interaction_create(options: interactionEventOptios): void;
}
//# sourceMappingURL=client.d.ts.map