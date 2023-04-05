"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkitaClient = void 0;
const oceanic_js_1 = require("oceanic.js");
class AkitaClient extends oceanic_js_1.Client {
    __options__;
    prefix = null;
    constructor(__options__) {
        super(__options__);
        this.__options__ = __options__;
        this.prefix = __options__.prefix ?? null;
    }
}
exports.AkitaClient = AkitaClient;
