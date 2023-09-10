import { ActivityType, Events } from 'discord.js';
import { schedule } from 'node-cron';

import { Event } from '../structures/Event';

import { News } from '../lib/News';
import { TaskFunction, createCronJob } from '../lib/CronJob';
import PaliaTime from '../lib/PaliaTime';

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
    const paliaTime = new PaliaTime();

    const newsTask: TaskFunction = async () => {
      await news.refresh();
    };

    const paliaTimeTask: TaskFunction = async () => {
      this.client.user?.setActivity({
        name: paliaTime.getCurrentPeriod(),
        type: ActivityType.Playing,
      });
    };

    const tasksAndSchedules: { task: TaskFunction; schedule: string }[] = [
      { task: newsTask, schedule: '*/1 * * * *' }, // Schedule for News
      { task: paliaTimeTask, schedule: '*/5 * * * *' }, // Schedule for PaliaTime
      // { task: anotherTask, schedule: '*/5 * * * *' }, // Schedule for another task
    ];

    tasksAndSchedules
      .map(({ task, schedule }) => createCronJob(task, schedule))
      .forEach((job) => job.start());

    this.client.logger.info(
      `${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`,
    );
  }
}
