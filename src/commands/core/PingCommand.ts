import { Message, MessageEmbed } from "discord.js";
import { CommandMeta } from "../../@typings";
import MusicBot from "../../structures/Music";

export default class PingCommand implements CommandMeta {
    readonly name = "ping";
    readonly description = "Play ping ? pong !";
    readonly guildOnly = true;
    constructor(private client: MusicBot) {}
    public execute(message: Message) {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(this.client.user!.displayAvatarURL())
        .setDescription(`:ping_pong: Pong! ${this.client.ws.ping}ms`)
        .setTimestamp();
        message.channel.send(embed);
    }
}