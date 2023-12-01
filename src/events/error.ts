import { Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../structures/Client.js";
import { Event } from "../structures/Event.js";

import { clientSymbol } from "../utils/Constants.js";

@injectable()
export default class Error extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onError", Events.Error);
	}

	public async run(error: Error): Promise<void> {
		this.client.logger.error(error);
	}
}
