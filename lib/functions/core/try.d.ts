import { AbstractAkitaFunction, LexerAkitaFunction, Interpreter, object_data } from "../../classes/index";
export default class extends AbstractAkitaFunction {
    name_in: string;
    type: "parent";
    name: string;
    solve(this: Interpreter, self: LexerAkitaFunction<unknown>, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=try.d.ts.map