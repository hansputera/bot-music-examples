import { readdir } from "fs";
import { CommandMeta, HelpMeta } from "../@typings";
import MusicBot from "./Music";

export default class CommandLoader {
    constructor(private client: MusicBot) {}
    load(path: string): MusicBot {
        readdir(path, (error, categories) => {
            if (error) console.error(error.message);
            else {
                console.info(`[CATEGORIES]: ${categories} loaded...`);
                categories.forEach(category => {
                    let moduleConf: HelpMeta = require(`${path}/${category}/module.json`);
                    moduleConf.path = `${path}/${category}`;
                    this.client.helps.set(category, moduleConf);
                    readdir(`${path}/${category}`, (err, files) => {
                        if (err) console.error(err.message);
                        else {
                            console.info(`[COMMANDS]: ${files.length - 1} loaded...`);
                            files.forEach(file => {
                                let prop: CommandMeta = new (require(`${path}/${category}/${file}`).default)(this.client);
                                this.client.commands.set(prop.name, prop);
                                prop.aliases!.forEach(alias => {
                                    this.client.aliases.set(alias, prop.name);
                                });
                                this.client.helps.get(category)!.cmds.push(prop.name);
                            });
                        }
                    });
                });
            }
        });
        return this.client;
    }
}