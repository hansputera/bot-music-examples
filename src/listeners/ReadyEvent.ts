import { EventProp } from "../@typings";
import MusicBot from "../structures/Music";

export default class ReadyEvent implements EventProp {
    readonly name = "ready";
    constructor(private client: MusicBot) {}
    public execute(): void {
        console.log(`[READY]: ${this.client.user!.username} logged`);
        this.client.user!.setActivity(
            'Hewwo </\>', {
                type: "PLAYING"
            }
        );
    }
}