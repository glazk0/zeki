import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageCreateOptions,
  MessagePayload,
} from 'discord.js';
import { eq } from 'drizzle-orm';
import { container } from 'tsyringe';

import { Client } from '../structures/Client';

import { db } from '../db';
import { guilds, news } from '../db/schema';

import { clusterIdOfGuildId } from '../utils/Commons';
import { PALIA_URL, clientSymbol } from '../utils/Constants';

import { Broadcaster } from './Broadcaster';

import { WeeklyWantsEmbed } from './embeds/WeeklyWantsEmbed';

export class WeeklyWants {
  /**
   * The client instance.
   * @type {Client}
   * @private
   * @readonly
   */
  private readonly client: Client;

  /**
   * The broadcaster instance.
   * @type {Broadcaster}
   * @private
   * @readonly
   */
  private readonly broadcaster: Broadcaster = new Broadcaster();

  constructor() {
    this.client = container.resolve(clientSymbol);

    this.client.logger.info('Weekly Wants initialized.');
  }

  public async refresh() {
    const data = (await this.client.api.getWeeklyWants()) as IWeeklyWantsItem;

    if (!data) return;

    let exists = await this.client.cache.exists(
      `weekly_wants:${this.client.cluster.id}`,
    );

    if (!exists) {
      await this.client.cache.set(
        `weekly_wants:${this.client.cluster.id}`,
        JSON.stringify(data),
      );
      return;
    }

    let cache = (await this.client.cache.get(
      `weekly_wants:${this.client.cluster.id}`,
    )) as IWeeklyWantsItem;

    if (!cache) return;

    cache = JSON.parse(cache as string) as IWeeklyWantsItem;

    if (cache.version === data.version) return;

    let settings = await db
      .select()
      .from(guilds)
      .innerJoin(news, eq(guilds.guildId, news.guildId));

    settings = settings.filter(
      (s) =>
        clusterIdOfGuildId(this.client, s.guilds.guildId) ===
        this.client.cluster.id,
    );

    let message: string | MessagePayload | MessageCreateOptions;

    const embed = new WeeklyWantsEmbed(data);

    const component = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('View full list')
        .setURL(`${PALIA_URL}/tools/weekly-wants`),
    );

    await Promise.all(
      settings.map(async (setting) => {
        const channel = this.client.channels.cache.get(setting.news.channel);

        if (!channel) return;

        message = {
          embeds: [embed],
          components: [component],
        };

        await this.broadcaster.broadcast(channel.id, message);
      }),
    );

    await this.client.cache.set(
      `weekly_wants:${this.client.cluster.id}`,
      JSON.stringify(data),
    );
  }
}
