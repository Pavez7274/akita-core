import { BaseInteraction, MessageReaction, ImageURLOptions, GuildMember, Message, Channel, Guild, User } from "discord.js";
export declare class ContextUser {
    private readonly data;
    constructor(data: User | GuildMember);
    private get __user__();
    get default_avatar(): string;
    get creation(): {
        timestamp: number;
        date: Date;
    };
    get discrim(): string;
    get name(): string;
    get tag(): string;
    get system(): boolean;
    get bot(): boolean;
    get id(): string;
    avatar(options?: ImageURLOptions, dinamyc?: boolean): string;
    banner(options?: ImageURLOptions): string | null;
    accent_color(dinamyc?: boolean): number | null;
    hex_color(dinamyc?: boolean): `#${string}` | null;
    get nick(): string | null;
}
export declare class Context {
    readonly data: Message | BaseInteraction | MessageReaction | Guild | Channel;
    constructor(data: Message | BaseInteraction | MessageReaction | Guild | Channel);
    get channel(): import("discord.js").CategoryChannel | import("discord.js").DMChannel | import("discord.js").PartialDMChannel | import("discord.js").PartialGroupDMChannel | import("discord.js").NewsChannel | import("discord.js").StageChannel | import("discord.js").TextChannel | import("discord.js").PrivateThreadChannel | import("discord.js").PublicThreadChannel<boolean> | import("discord.js").VoiceChannel | import("discord.js").ForumChannel | null;
    get guild(): Guild | null;
    get author(): ContextUser | null;
    get message(): Message<boolean> | import("discord.js").PartialMessage | null;
    get users(): import("discord.js").ReactionUserManager | null;
}
//# sourceMappingURL=context.d.ts.map