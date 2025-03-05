import { DMChannel, Events, NonThreadGuildBasedChannel } from 'discord.js';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'tsyringe';

import { Client } from '../structures/Client.js';
import { Event } from '../structures/Event.js';

import { clientSymbol } from '../utils/Constants.js';

import { db } from '../db/client.js';
import { guildsNews } from '../db/schema.js';

@injectable()
export default class ChannelDelete extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super('onChannelDelete', Events.ChannelDelete);
	}

	async run(channel: NonThreadGuildBasedChannel | DMChannel): Promise<void> {
		if (!this.client.isReady()) return;

		if (channel.isDMBased() || !channel.isTextBased()) return;

		try {
			const row = await db.delete(guildsNews).where(eq(guildsNews.channel, channel.id));

			if (row.count === 0) return;

			this.client.logger.info(`Channel ${channel.id} deleted in guild ${channel.guildId}.`);
		} catch (error) {
			this.client.logger.error(`Error while deleting a channel from the database: ${error}`);
		}
	}
}
