import { Interpreter, object_data } from "./interpreter";
import { type akitaFunction } from "./lexer";
export declare type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export declare function requiredFields(min?: number): (target: AbstractAkitaFunction, propertyKey: "solve", descriptor: TypedPropertyDescriptor<AbstractAkitaFunction["solve"]>) => TypedPropertyDescriptor<(this: Interpreter, self: RequiredField<akitaFunction, "fields" | "inside">, data: object_data) => Promise<object_data>>;
export declare abstract class AbstractAkitaFunction<T = object_data> {
    type: "unknown" | "parent";
    prototypes: Array<string>;
    name_in?: string;
    abstract name: string;
    abstract solve(this: Interpreter, self: akitaFunction, data: T): Promise<T>;
}
export declare class VoidAkitaFunction extends AbstractAkitaFunction {
    name: string;
    solve(): Promise<object_data>;
}
//# sourceMappingURL=function.d.ts.map