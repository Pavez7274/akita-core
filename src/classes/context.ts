import {
    BaseInteraction,
    MessageReaction,
    ImageURLOptions,
    GuildChannel,
    GuildMember,
    Message,
    Channel,
    Guild,
    User,
} from "discord.js";

export class ContextUser {
    constructor(
        private readonly data: User | GuildMember
    ) { }
    private get __user__() {
        return "user" in this.data ? this.data.user : this.data;
    }
    //? USER
    public get default_avatar() {
        return this.__user__.defaultAvatarURL;
    }
    public get creation() {
        return {
            timestamp: this.__user__.createdTimestamp,
            date: this.__user__.createdAt
        };
    }
    public get discrim() {
        return this.__user__.discriminator;
    }
    public get name() {
        return this.__user__.username;
    }
    public get tag() {
        return this.__user__.tag;
    }
    public get system() {
        return this.__user__.system;
    }
    public get bot() {
        return this.__user__.bot;
    }
    public get id() {
        return this.__user__.id;
    }
    public avatar(options?: ImageURLOptions, dinamyc = true) {
        return dinamyc && this.data instanceof GuildMember
            ? this.data.displayAvatarURL(options)
            : this.__user__.displayAvatarURL(options);
    }
    public banner(options?: ImageURLOptions) {
        return this.__user__.bannerURL(options) ?? null;
    }
    public accent_color(dinamyc = true) {
        return dinamyc && this.data instanceof GuildMember
            ? this.data.displayColor
            : this.__user__.accentColor ?? null;
    }
    public hex_color(dinamyc = true) {
        return dinamyc && this.data instanceof GuildMember
            ? this.data.displayHexColor
            : this.__user__.hexAccentColor ?? null;
    }
    //? MEMBER
    public get nick() {
        return "nickname" in this.data ? this.data.nickname : null;
    }
}
export class Context {
    constructor(
        public readonly data: Message | BaseInteraction | MessageReaction | Guild | Channel
    ) { }
    public get channel() {
        return "channel" in this.data
            ? this.data.channel
            : "message" in this.data
                ? this.data.message.channel
                : this.data instanceof Guild
                    ? this.data.systemChannel
                    : this.data;
    }
    public get guild() {
        return "guild" in this.data
            ? this.data.guild
            : "message" in this.data
                ? this.data.message.guild
                : this.data instanceof GuildChannel
                    ? this.data.guild
                    : this.data instanceof Guild
                        ? this.data
                        : null;
    }
    public get author() {
        return "author" in this.data
            ? new ContextUser(this.data.author)
            : "message" in this.data && this.data.message.author
                ? new ContextUser(this.data.message.member ?? this.data.message.author)
                : this.data instanceof BaseInteraction
                    ? new ContextUser(this.data.member as GuildMember ?? this.data.user)
                    : null;
    }
    public get message() {
        return this.data instanceof Message
            ? this.data : "message" in this.data
                ? this.data.message : null;
    }
    public get users() {
        return this.data instanceof MessageReaction
            ? this.data.users
            : null;
    }
} 