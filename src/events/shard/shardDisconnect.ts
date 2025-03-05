import { CloseEvent, Events } from 'discord.js';
import { inject, injectable } from 'tsyringe';

import { Client } from '../../structures/Client.js';
import { Event } from '../../structures/Event.js';

import { clientSymbol } from '../../utils/Constants.js';

@injectable()
export default class ShardDisconnect extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super('onShardDisconnect', Events.ShardDisconnect);
	}

	public async run(event: CloseEvent, id: number): Promise<void> {
		this.client.logger.warn(`[Shard #${id}] Code ${event.code}, ${event.reason}`);
	}
}
