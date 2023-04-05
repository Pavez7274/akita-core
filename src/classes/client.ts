import { Client, ClientOptions } from "oceanic.js";

export type akitaClientOptions = ClientOptions & {
    prefix?: string | string[]
    insensitive?: boolean
}

export class AkitaClient extends Client {
    public prefix: string | string[] | null = null;
    constructor(public readonly __options__: akitaClientOptions) {
        super(__options__);
        this.prefix = __options__.prefix ?? null;
    }
}