import { Events } from "discord.js";
import { inject } from "tsyringe";

import { Event } from "../structures/Event.js";
import { Client } from "../structures/Client.js";

import { clientSymbol } from "../utils/Constants.js";

export default class Ready extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onReady", Events.ClientReady, true);
	}

	async run(): Promise<void> {
		this.client.logger.info(`${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.shard?.ids[0]}`);
	}
}
