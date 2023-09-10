import { Events } from 'discord.js';
import { schedule } from 'node-cron';

import { Event } from '../structures/Event';
import { News } from '../lib/News';

export default class Ready extends Event {
  constructor() {
    super('onReady', Events.ClientReady);
  }

  async run(): Promise<void> {
    const shards =
      [...this.client.cluster.ids.keys()].length > 1
        ? [...this.client.cluster.ids.keys()].join(', ')
        : [...this.client.cluster.ids.keys()];

    const news = new News();

    const job = schedule('*/1 * * * *', async () => {
      await news.refresh();
    });

    job.start();

    this.client.logger.info(
      `${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`,
    );
  }
}
