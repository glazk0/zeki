import { Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Event } from "../../structures/Event.js";

import { clientSymbol } from "../../utils/Constants.js";

@injectable()
export default class ShardError extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onShardError", Events.ShardError);
	}

	public async run(error: Error, id: number): Promise<void> {
		this.client.logger.warn(`[Shard #${id}] ${error.stack}`);
	}
}
