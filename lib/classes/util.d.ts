/// <reference types="node" />
import { Dirent } from "fs";
import { DeserializeOptions } from "hjson";
import { transpilerData } from "./transpiler";
export default class Util {
    static readonly operators: string[];
    static readonly falsys: string[];
    static parse_object(to_solve: string, options?: DeserializeOptions, default_value?: object, suppress?: boolean): object | undefined;
    static solve_equal(sentence: string): boolean;
    static solve_unequal(sentence: string): boolean;
    static solve_greater(sentence: string): boolean;
    static solve_greater_or_equal(sentence: string): boolean;
    static solve_less(sentence: string): boolean;
    static solve_less_or_equal(sentence: string): boolean;
    static solve_condition(sentence: string, suppress?: boolean): boolean;
    static booleanify(str: string): boolean;
    static get_files(mod: string, result?: Dirent[]): Dirent[];
    static interpolate_strig(field: string, data: transpilerData): string;
}
//# sourceMappingURL=util.d.ts.map