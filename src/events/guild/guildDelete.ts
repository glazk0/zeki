import { Events, Guild } from "discord.js";
import { eq } from "drizzle-orm";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Event } from "../../structures/Event.js";

import { clientSymbol } from "../../utils/Constants.js";

import { db } from "../../db/index.js";
import { guilds } from "../../db/schema/index.js";

@injectable()
export default class GuildDelete extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super("onGuildDelete", Events.GuildDelete);
	}

	async run(guild: Guild): Promise<void> {
		if (!this.client.isReady) return;

		try {
			await db.delete(guilds).where(eq(guilds.guildId, guild.id));
		} catch (error) {
			this.client.logger.error(`Error while deleting a guild from the database: ${error}`);
		}

		this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
	}
}
