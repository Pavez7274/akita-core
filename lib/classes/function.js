"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidAkitaFunction = exports.AbstractAkitaFunction = void 0;
class AbstractAkitaFunction {
}
exports.AbstractAkitaFunction = AbstractAkitaFunction;
class VoidAkitaFunction extends AbstractAkitaFunction {
    name = "undefined";
    solve() {
        throw new Error("void function");
    }
}
exports.VoidAkitaFunction = VoidAkitaFunction;
