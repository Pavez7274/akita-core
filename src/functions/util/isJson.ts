import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import Util from "../../classes/util";
import { isNil } from "lodash";

export default class sleep extends AbstractAkitaFunction {
    override name = "@isJson";
    override async solve(self: akitaFunction, data: object_data): Promise<object_data> {
        if (isNil(self.inside)) throw new Error("@isJson require brackets");
        await Interpreter.solve_fields(data, self);
        const x = Util.parse_object(self.inside);
        data.input = data.input.replace(self.id, x ? "true" : "false");
        return data;
        // const { inside } = self.fields(data.input);
        // if (isNil(inside)) throw new Error("$sleep require brackets");
        // data.imports.includes("var Util = require(\"akita.ts/lib/classes/util\");")
        //     || (data.imports += "var Util = require(\"akita.ts/lib/classes/util\";\n");
        // data.returns[self.id] = `Util.parse_object(${inside.replace(/SYSTEM_RESULT\("(.*?)"\)/g, (a, m) => data.returns[m] || a)}, false) ? true : false`;
        // data.input = data.input.replace(self.total, `SYSTEM_RESULT("${self.id}")`);
    }
}