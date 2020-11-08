import { Client, ClientOptions, Collection } from "discord.js";
import { resolve } from "path";
import { CommandMeta, HelpMeta } from "../@typings";
import CommandLoader from "./Commands";
import EventLoader from "./Events";
import config from "../config.json";
import Util from "./Util";

export default class MusicBot extends Client {
    public commands: Collection<string, CommandMeta> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public helps: Collection<string, HelpMeta> = new Collection();
    readonly config = config;
    public util = new Util(this);

    constructor(options?: ClientOptions) {
        super(options);
    }
    build(): void {
        this.login(config.TOKEN).then(() => {
        new EventLoader(this).load(resolve(__dirname, "..", "listeners"));
        new CommandLoader(this).load(resolve(__dirname, "..", "commands"));
        }).catch((e) => {
            throw new Error(e);
        });
    }
}