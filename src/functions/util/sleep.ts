import { transpilerData } from "../../classes/transpiler";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class $sleep extends AbstractAkitaFunction {
    override name = "$sleep";
    override async solve(self: akitaFunction, data: transpilerData): Promise<transpilerData> {
        const { fields } = self.fields(data.input);
        if (isNil(fields)) throw new Error("$sleep require brackets");
        data.imports.includes("var { setTimeout } = require(\"timers/promises\");")
            || (data.imports += "var { setTimeout } = require(\"timers/promises\");");
        data.returns[self.id] = `await setTimeout(${fields.join(",")})`;
        data.input = data.input.replace(self.total, `SYSTEM_RESULT("${self.id}")`);
        return data;
    }
}