import { BaseInteraction, MessageReaction, Message, Channel, Guild } from "discord.js";
import { User, Member } from "oceanic.js";
export declare class ContextUser {
    private readonly data;
    constructor(data: User | Member);
    private get __user__();
    get default_avatar(): string;
    get creation(): {
        timestamp: Date;
        date: Date;
    };
    get discrim(): string;
    get name(): string;
    get tag(): string;
    get system(): boolean;
    get bot(): boolean;
    get id(): string;
    avatar(format?: "jpg" | "jpeg" | "png" | "webp" | "gif", dinamyc?: boolean): string;
    banner(): string | null;
    accent_color(dinamyc?: boolean): any;
    hex_color(dinamyc?: boolean): any;
    get nick(): any;
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