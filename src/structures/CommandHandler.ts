import { Message } from "discord.js";
import MusicBot from "./Music";

export default class CommandHandler {
    constructor(private client: MusicBot) {}
    execute(message: Message) {
        const args = message.content.slice(this.client.config.PREFIX.length).trim().split(/ +/g);
        const command = args.shift()!.toLowerCase();

        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command)!);
        if (cmd!.guildOnly && message.channel.type === "dm") return;
        if (cmd!.ownerOnly && !this.client.config.owners.includes(message.author.id)) return message.reply("Only developers can execute this command!");
        cmd!.execute(message, args);
        if (!cmd) return;
    }
}