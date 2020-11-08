import { ClientEvents, Message } from "discord.js";

export interface EventProp {
    name: keyof ClientEvents;
    execute(...args: ClientEvents[EventProp["name"]]): any;
}

export interface HelpMeta {
    name: string;
    path: string;
    hide: boolean;
    cmds: string[];
}

export interface CommandMeta {
    name: string;
    description?: string;
    aliases?: string[];
    ownerOnly?: boolean;
    guildOnly?: boolean;
    maintenance?: boolean;
    execute(message: Message, args?: string[]): any;
}