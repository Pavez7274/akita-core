import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";
import { isNil } from "lodash";

export default class _function extends AbstractAkitaFunction {
    override name = "@function";
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@function require brackets");
        await this.solve_fields(data, self);
        this.resolve(data, self, new Function(`"use strict";\n${self.inside}`).bind(this));
        return data;
    }
}