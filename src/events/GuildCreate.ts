import { Events, Guild } from 'discord.js';

import { Event } from '../structures/Event';
import { db } from '../db';
import { guilds } from '../db/schema';

export default class GuildCreate extends Event {
  constructor() {
    super('onGuildCreate', Events.GuildCreate);
  }

  async run(guild: Guild): Promise<void> {
    if (!this.client.isReady) return;

    await db.insert(guilds).values({
      guildId: guild.id,
    });

    this.client.logger.info(`Joined ${guild.name} (${guild.id})`);
  }
}
