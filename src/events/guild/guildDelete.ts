import { Events, Guild } from "discord.js";
import { inject, injectable } from "tsyringe";
import { eq } from "drizzle-orm";

import { Event } from "../../structures/Event";
import { Client } from "../../structures/Client";

import { clientSymbol } from "../../utils/Constants";

import { db } from "../../db/index.js";
import { guilds, news } from "../../db/schema/index.js";

@injectable()
export default class GuildDelete extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onGuildDelete", Events.GuildDelete);
	}

	async run(guild: Guild): Promise<void> {
		if (!this.client.isReady) return;

		try {
			await db.transaction(async (tx) => {
				await tx.delete(news).where(eq(news.guildId, guild.id));
				await tx.delete(guilds).where(eq(guilds.guildId, guild.id));
			});
		} catch (error) {
			this.client.logger.error("Error while deleting a guild", error);
		}

		this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
	}
}
