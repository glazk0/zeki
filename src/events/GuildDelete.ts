import { Events, Guild } from 'discord.js';

import { Event } from '../structures/Event';

export default class GuildDelete extends Event {
  constructor() {
    super('onGuildDelete', Events.GuildDelete);
  }

  async run(guild: Guild): Promise<void> {
    if (!this.client.isReady) return;

    this.client.logger.info(`Leaved ${guild.name} (${guild.id})`);
  }
}
