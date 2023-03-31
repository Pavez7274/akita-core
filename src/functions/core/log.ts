import { transpilerData } from "../../classes/transpiler";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class $log extends AbstractAkitaFunction {
    override name = "$log";
    override async solve(self: akitaFunction, data: transpilerData): Promise<transpilerData> {
        let { fields } = self.fields(data.input);
        if (isNil(fields)) throw new Error("$log require brackets");
        fields = fields.map(f => `"${f.replace(/"/g, "\\\"")}"`);
        data.returns[self.id] = `console.log(${fields.join(",")})`;
        data.input = data.input.replace(self.total, `SYSTEM_RESULT("${self.id}")`);
        return data;
    }
}