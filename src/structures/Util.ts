import MusicBot from "./Music";

export default class Util {
    constructor(private client: MusicBot) {}
    
    getGuildIcon(guildID: string): string {
        return this.client.guilds.cache.get(guildID)!.iconURL({ format: "png", size: 4096 })!;
    }
}