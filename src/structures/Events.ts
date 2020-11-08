import { readdirSync } from "fs";
import { EventProp } from "../@typings";
import MusicBot from "./Music";

export default class EventLoader {
    constructor(private client: MusicBot) {}
    load(path: string): MusicBot {
        for (const event of readdirSync(path).filter(fl => fl.endsWith(".js"))) {
            const file: EventProp = new (require(`${path}/${event}`).default)(this.client);
            console.info(`[EVENT]: ${event.split(".")[0]} loaded...`);
            this.client.on(file.name, (...args) => file.execute(...args));
        }
        return this.client;
    }
}