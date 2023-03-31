"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = exports.ContextUser = void 0;
const discord_js_1 = require("discord.js");
class ContextUser {
    data;
    constructor(data) {
        this.data = data;
    }
    get __user__() {
        return "user" in this.data ? this.data.user : this.data;
    }
    get default_avatar() {
        return this.__user__.defaultAvatarURL;
    }
    get creation() {
        return {
            timestamp: this.__user__.createdTimestamp,
            date: this.__user__.createdAt
        };
    }
    get discrim() {
        return this.__user__.discriminator;
    }
    get name() {
        return this.__user__.username;
    }
    get tag() {
        return this.__user__.tag;
    }
    get system() {
        return this.__user__.system;
    }
    get bot() {
        return this.__user__.bot;
    }
    get id() {
        return this.__user__.id;
    }
    avatar(options, dinamyc = true) {
        return dinamyc && this.data instanceof discord_js_1.GuildMember
            ? this.data.displayAvatarURL(options)
            : this.__user__.displayAvatarURL(options);
    }
    banner(options) {
        return this.__user__.bannerURL(options) ?? null;
    }
    accent_color(dinamyc = true) {
        return dinamyc && this.data instanceof discord_js_1.GuildMember
            ? this.data.displayColor
            : this.__user__.accentColor ?? null;
    }
    hex_color(dinamyc = true) {
        return dinamyc && this.data instanceof discord_js_1.GuildMember
            ? this.data.displayHexColor
            : this.__user__.hexAccentColor ?? null;
    }
    get nick() {
        return "nickname" in this.data ? this.data.nickname : null;
    }
}
exports.ContextUser = ContextUser;
class Context {
    data;
    constructor(data) {
        this.data = data;
    }
    get channel() {
        return "channel" in this.data
            ? this.data.channel
            : "message" in this.data
                ? this.data.message.channel
                : this.data instanceof discord_js_1.Guild
                    ? this.data.systemChannel
                    : this.data;
    }
    get guild() {
        return "guild" in this.data
            ? this.data.guild
            : "message" in this.data
                ? this.data.message.guild
                : this.data instanceof discord_js_1.GuildChannel
                    ? this.data.guild
                    : this.data instanceof discord_js_1.Guild
                        ? this.data
                        : null;
    }
    get author() {
        return "author" in this.data
            ? new ContextUser(this.data.author)
            : "message" in this.data && this.data.message.author
                ? new ContextUser(this.data.message.member ?? this.data.message.author)
                : this.data instanceof discord_js_1.BaseInteraction
                    ? new ContextUser(this.data.member ?? this.data.user)
                    : null;
    }
    get message() {
        return this.data instanceof discord_js_1.Message
            ? this.data : "message" in this.data
            ? this.data.message : null;
    }
    get users() {
        return this.data instanceof discord_js_1.MessageReaction
            ? this.data.users
            : null;
    }
}
exports.Context = Context;
