import { Events } from "discord.js";
import { injectable } from "tsyringe";

import { Client } from "../structures/Client.js";
import { Event } from "../structures/Event.js";

@injectable()
export default class Ready extends Event {
	constructor() {
		super("onReady", Events.ClientReady, true);
	}

	async run(client: Client): Promise<void> {
		client.logger.info(`${client.user?.tag}, ready to serve ${client.guilds.cache.size} servers on shard #${client.shard?.ids.pop()}`);
	}
}
