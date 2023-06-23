import { AbstractAkitaFunction, LexerAkitaFunction, Interpreter, object_data } from "../../../classes";
export default class extends AbstractAkitaFunction {
    name_in: string;
    name: string;
    prototypes: string[];
    solve(this: Interpreter, self: LexerAkitaFunction<string>, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=function.d.ts.map