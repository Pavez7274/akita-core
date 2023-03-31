import Util from "./util";

export class Field {
    constructor(
        public string: string,
    ) { }
    public solve_as_string() {
        return `"${this.string.replace(/"/g, "\\\"")}"`;
    }
    public solve_as_boolean() {
        return Util.booleanify(this.string);
    }
    public solve_as_number() {
        return Number(this.string);
    }
    public _solve() {
        return;
    }
}