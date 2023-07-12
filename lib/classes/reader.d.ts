/// <reference types="node" />
import { Interpreter, record } from "./interpreter";
export declare class Reader {
    private interpreter;
    exports: record;
    constructor(interpreter: Interpreter);
    run_dir(mod: string): Promise<void>;
    run_file(mod: string): Promise<unknown>;
    read_dir(mod: string): import("fs").Dirent[];
    read_file(mod: string): string;
}
//# sourceMappingURL=reader.d.ts.map