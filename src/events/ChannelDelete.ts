import { ChannelType, DMChannel, Events, GuildChannel } from 'discord.js';
import { eq } from 'drizzle-orm';

import { Event } from '../structures/Event';

import { db } from '../db';
import { news } from '../db/schema';

export default class ChannelDelete extends Event {
  constructor() {
    super('onChannelDelete', Events.ChannelDelete);
  }

  async run(channel: GuildChannel | DMChannel): Promise<void> {
    if (!this.client.isReady) return;

    if (channel.isDMBased() || [ChannelType.GuildVoice].includes(channel.type))
      return;

    await db.delete(news).where(eq(news.channel, channel.id));

    this.client.logger.info(
      `Channel ${channel.id} deleted in guild ${channel.guildId}.`,
    );
  }
}
