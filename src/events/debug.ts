import { Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../structures/Client.js";
import { Event } from "../structures/Event.js";

import { clientSymbol } from "../utils/Constants.js";

@injectable()
export default class Debug extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onDebug", Events.Debug);
	}

	public async run(message: string): Promise<void> {
		if (!message.match(/heartbeat/gi)) this.client.logger.debug(message);
	}
}
