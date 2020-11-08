import { Message } from "discord.js";
import { EventProp } from "../@typings";
import CommandHandler from "../structures/CommandHandler";
import MusicBot from "../structures/Music";

export default class MessageEvent implements EventProp {
    readonly name = "ready";
    constructor(private client: MusicBot) {}
    public execute(message: Message): void {
        if (message.author.bot) return;
        const msg = message.content.toLowerCase();
        if (msg === `<@!${this.client.user!.id}>` || msg === `<@${this.client.user!.id}>`) {
            message.channel.send(`Hello ${message.author.username}, how are u?`);
        }
        
        if (msg.startsWith(this.client.config.PREFIX)) {
            new CommandHandler(this.client).execute(message);
        }
    }
}