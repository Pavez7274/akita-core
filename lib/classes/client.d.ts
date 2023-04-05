import { Client, ClientOptions } from "oceanic.js";
export declare type akitaClientOptions = ClientOptions & {
    prefix?: string | string[];
    insensitive?: boolean;
};
export declare class AkitaClient extends Client {
    readonly __options__: akitaClientOptions;
    prefix: string | string[] | null;
    constructor(__options__: akitaClientOptions);
}
//# sourceMappingURL=client.d.ts.map