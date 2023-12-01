import { ChannelType, DMChannel, Events, GuildChannel, NonThreadGuildBasedChannel } from "discord.js";
import { inject } from "tsyringe";
import { eq } from "drizzle-orm";

import { Event } from "../structures/Event";
import { Client } from "../structures/Client";

import { clientSymbol } from "../utils/Constants";

import { db } from "../db";
import { news } from "../db/schema";

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
