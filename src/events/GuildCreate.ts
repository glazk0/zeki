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

    try {
      await db.insert(guilds).values({
        guildId: guild.id,
      });
    } catch (error) {
      this.client.logger.error('Error while inserting a guild', error);
    }

    this.client.logger.info(`Joined ${guild.name} (${guild.id})`);
  }
}
