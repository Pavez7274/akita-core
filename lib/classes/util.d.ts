/// <reference types="node" />
import { DeserializeOptions } from "hjson";
import { object_data } from "./interpreter";
import { Dirent } from "fs";
export declare function iterate<T, R>(iterator: IterableIterator<T>, cb: (value: T, index: number, iter: IterableIterator<T>) => R): void;
export declare class AkitaError extends Error {
    constructor(msg: string);
}
export default class Util {
    static readonly falsys: string[];
    static parse_object(to_solve: string, options?: DeserializeOptions, default_value?: object, suppress?: boolean): object | undefined;
    static booleanify(str: string): boolean;
    static get_files(mod: string, result?: Dirent[]): Dirent[];
    static interpolate_strig(field: string, data: object_data): string;
}
//# sourceMappingURL=util.d.ts.map