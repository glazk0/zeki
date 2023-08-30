import { Events, Guild } from 'discord.js';

import { Event } from '../structures/Event';
import { db } from '../db';
import { guilds, news } from '../db/schema';
import { eq } from 'drizzle-orm';

export default class GuildDelete extends Event {
  constructor() {
    super('onGuildDelete', Events.GuildDelete);
  }

  async run(guild: Guild): Promise<void> {
    if (!this.client.isReady) return;

    await db.transaction(async (tx) => {
      await tx.delete(news).where(eq(news.guildId, guild.id));
      await tx.delete(guilds).where(eq(guilds.guildId, guild.id));
    });

    this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
  }
}
