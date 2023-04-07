"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkitaClient = void 0;
const oceanic_js_1 = require("oceanic.js");
const interaction_1 = require("../events/interaction");
class AkitaClient extends oceanic_js_1.Client {
    __options__;
    commands = [];
    prefix = null;
    constructor(__options__) {
        super(__options__);
        this.__options__ = __options__;
        this.prefix = __options__.prefix ?? null;
    }
    add_commands(...commands) {
        this.commands.push(...commands);
    }
    on_interaction_create(options) {
        this.on("interactionCreate", int => (0, interaction_1.interaction_create_event)(int, this, options));
    }
}
exports.AkitaClient = AkitaClient;
