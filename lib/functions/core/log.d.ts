import { AbstractAkitaFunction, LexerAkitaFunction, Interpreter, object_data } from "../../classes/index";
export default class extends AbstractAkitaFunction {
    name_in: string;
    name: string;
    solve(this: Interpreter, self: LexerAkitaFunction<unknown>, data: object_data): Promise<object_data>;
}
//# sourceMappingURL=log.d.ts.map