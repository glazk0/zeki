import { Events } from 'discord.js';
import { ScheduleOptions } from 'node-cron';

import { Event } from '../structures/Event';

import { TaskFunction, createCronJob } from '../lib/CronJob';

import { News } from '../lib/News';
import { WeeklyWants } from '../lib/WeeklyWants';

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
    const weeklyWants = new WeeklyWants();

    const newsTask: TaskFunction = async () => {
      await news.refresh();
    };

    const weeklyWantsTask: TaskFunction = async () => {
      await weeklyWants.refresh();
    };

    const tasksAndSchedules: {
      task: TaskFunction;
      schedule: string;
      options?: ScheduleOptions;
    }[] = [
      { task: newsTask, schedule: '*/1 * * * *' },
      {
        task: weeklyWantsTask,
        schedule: '0 */1 * * *',
        options: { runOnInit: true },
      },
    ];

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
