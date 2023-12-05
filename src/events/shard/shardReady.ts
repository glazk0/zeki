import { Events } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Event } from "../../structures/Event.js";

import { clientSymbol } from "../../utils/Constants.js";

@injectable()
export default class ShardReady extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onShardReady", Events.ShardReady);
	}

	public async run(id: number): Promise<void> {
		this.client.logger.info(`Shard #${id} ready!`);
	}
}
