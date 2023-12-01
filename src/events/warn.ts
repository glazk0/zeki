import { Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../structures/Client.js";
import { Event } from "../structures/Event.js";

import { clientSymbol } from "../utils/Constants.js";

@injectable()
export default class Warn extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onWarn", Events.Warn);
	}

	public async run(info: string): Promise<void> {
		this.client.logger.warn(info);
	}
}
