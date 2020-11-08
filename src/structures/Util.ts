import MusicBot from "./Music";

export default class Util {
    constructor(private client: MusicBot) {}
    
    getGuildIcon(guildID: string): string | null {
        const guild = this.client.guilds.resolve(guildID);
        if (!guild) return null;
        else return guild.iconURL({
            size: 4096,
            format: "png"
        });
    }
}