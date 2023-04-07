import { bindKey, drop, get, invoke, isFunction, isNil, result, spread } from "lodash";
import { Interpreter, object_data } from "../../classes/interpreter";
import { AbstractAkitaFunction } from "../../classes/function";
import { akitaFunction } from "../../classes/lexer";


function _(obj: object, path: string, defaultValue: unknown) {
    // eslint-disable-next-line prefer-rest-params
    const args = drop(arguments, 3);
    if (isFunction(get(obj, path)) && args.length) {
        return spread(bindKey(obj, path))(args);
    } else {
        return result(obj, path, defaultValue);
    }
}

export default class _get extends AbstractAkitaFunction {
    override name = "@get";
    prototypes: string[] = [".strict", ".invoke"];
    override async solve(this: Interpreter, self: akitaFunction, data: object_data) {
        if (isNil(self.inside) || isNil(self.fields)) throw new Error("@get require brackets");
        await this.solve_fields(data, self);
        if (self.prototype === ".strict")
            this.resolve(data, self, get(data.extra.variables, self.fields[0].value, self.fields[1]?.value));
        else if (self.prototype === ".invoke")
            this.resolve(
                data,
                self,
                invoke(
                    data.extra.variables,
                    self.fields[0].value,
                    ...self.fields.slice(1).map(({ value }) => value)
                )
            );
        else
            this.resolve(
                data,
                self,
                _(
                    data.extra.variables,
                    self.fields[0].value,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    ...self.fields.slice(1).map(({ value }) => value)
                )
            );
        return data;
    }
}