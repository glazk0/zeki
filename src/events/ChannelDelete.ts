import { ChannelType, DMChannel, Events, NonThreadGuildBasedChannel } from "discord.js";
import { eq } from "drizzle-orm";
import { inject, injectable } from "tsyringe";

import { Client } from "../structures/Client.js";
import { Event } from "../structures/Event.js";

import { clientSymbol } from "../utils/Constants.js";

import { db } from "../db/index.js";
import { news } from "../db/schema/index.js";

@injectable()
export default class ChannelDelete extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onChannelDelete", Events.ChannelDelete);
	}

	async run(channel: NonThreadGuildBasedChannel | DMChannel): Promise<void> {
		if (!this.client.isReady) return;

		if (channel.isDMBased() || [ChannelType.GuildVoice].includes(channel.type)) return;

		await db.delete(news).where(eq(news.channel, channel.id));

		this.client.logger.info(`Channel ${channel.id} deleted in guild ${channel.guildId}.`);
	}
}
