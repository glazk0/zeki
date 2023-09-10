import { ActivityType, Events } from 'discord.js';
import { ScheduleOptions, schedule } from 'node-cron';

import { Event } from '../structures/Event';

import { News } from '../lib/News';
import { TaskFunction, createCronJob } from '../lib/CronJob';

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

    const newsTask: TaskFunction = async () => {
      await news.refresh();
    };

    const tasksAndSchedules: {
      task: TaskFunction;
      schedule: string;
      options?: ScheduleOptions;
    }[] = [{ task: newsTask, schedule: '*/1 * * * *' }];

    tasksAndSchedules
      .map(({ task, schedule, options }) =>
        createCronJob(task, schedule, options),
      )
      .forEach((job) => job.start());

    this.client.logger.info(
      `${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`,
    );
  }
}
