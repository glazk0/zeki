import { Events, Guild, GuildTextBasedChannel, hyperlink } from 'discord.js';
import { ScheduleOptions } from 'node-cron';

import { Event } from '../structures/Event';

import { TaskFunction, createCronJob } from '../lib/CronJob';

import { News } from '../lib/News';
import { WeeklyWants } from '../lib/WeeklyWants';
import { guilds, news } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { PALIA_URL } from '../utils/Constants';

export default class Ready extends Event {
  constructor() {
    super('onReady', Events.ClientReady);
  }

  async run(): Promise<void> {
    const shards =
      [...this.client.cluster.ids.keys()].length > 1
        ? [...this.client.cluster.ids.keys()].join(', ')
        : [...this.client.cluster.ids.keys()];

    // const news = new News();
    // const weeklyWants = new WeeklyWants();

    // const newsTask: TaskFunction = async () => {
    //   await news.refresh();
    // };

    // const weeklyWantsTask: TaskFunction = async () => {
    //   await weeklyWants.refresh();
    // };

    // const apiRefreshTask: TaskFunction = async () => {
    //   await this.client.api.refreshVersion();
    // };

    // const tasksAndSchedules: {
    //   task: TaskFunction;
    //   schedule: string;
    //   options?: ScheduleOptions;
    // }[] = [
    //   { task: newsTask, schedule: '*/5 * * * *' },
    //   {
    //     task: weeklyWantsTask,
    //     schedule: '0 */1 * * *',
    //     options: { runOnInit: true },
    //   },
    //   {
    //     task: apiRefreshTask,
    //     schedule: '0 */6 * * *',
    //     options: { runOnInit: true },
    //   },
    // ];

    // tasksAndSchedules
    //   .map(({ task, schedule, options }) =>
    //     createCronJob(task, schedule, options),
    //   )
    //   .forEach((job) => job.start());

    // TODO Remove
    let settings = await db
      .select()
      .from(guilds)
      .innerJoin(news, eq(news.guildId, guilds.guildId));

    settings.forEach(async (setting) => {
      const guild = this.client.guilds.cache.get(setting.guilds.guildId);
      const channel = guild?.channels.cache.get(setting.news.channel) as GuildTextBasedChannel;
      if (channel) {
        await channel.send(`Zeki is being shut down until further notice, you can see the reason ${hyperlink('here', PALIA_URL)}\n\nThank you to everyone who used Zeki, it was a fun project to work on and I hope you all enjoyed it.`);
      }
    });

    this.client.logger.info(
      `${this.client.user?.tag}, ready to serve ${this.client.guilds.cache.size} servers on cluster #${this.client.cluster.id} (Shards: ${shards})`,
    );
  }
}
