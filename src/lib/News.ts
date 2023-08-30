import { load } from 'cheerio';
import { container } from 'tsyringe';
import { eq } from 'drizzle-orm';

import { Client } from '../structures/Client';

import { clientSymbol } from '../utils/Constants';

import { INews } from '../types';

import { db } from '../db';
import { guilds, news } from '../db/schema';
import { clusterIdOfGuildId } from '../utils/Commons';
import { NewsEmbed } from './embeds/NewsEmbed';
import { Broadcaster } from './Broadcaster';
import { MessageCreateOptions, MessagePayload } from 'discord.js';

export class News {
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

  /**
   * List of the supported locales by Palia.
   * @type {string[]}
   */
  private locales = ['', 'fr-FR', 'de-DE', 'it-IT', 'es-ES'];

  /**
   * The Palia website.
   * @type {string}
   */
  private website = 'https://www.palia.com';

  constructor() {
    this.client = container.resolve(clientSymbol);
  }

  public init() {
    this.client.logger.info('News scrapper initialized.');
    setInterval(() => this.refresh(), 1 * 60 * 1000);
  }

  private async refresh() {
    let data = await this.scrape();

    console.log(data.length);

    // data = data.filter(
    //   (item) =>
    //     this.client.cache.get(
    //       `news:${this.client.cluster.id}:${item.key}:${item.locale}`,
    //     ) === undefined,
    // );

    console.log(data.length);

    if (!data.length) return;

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

    await Promise.all(
      settings.map(async (setting) => {
        const channel = this.client.channels.cache.get(setting.news.channel);

        if (!channel) return;

        data = data.filter(
          (item) => item.locale?.split('-')[0] === setting.guilds.locale,
        );

        for (const item of data) {
          const embed = new NewsEmbed(item);

          message = {
            embeds: [embed],
          };

          // this.client.cache.set(
          //   `news:${this.client.cluster.id}:${item.key}:${item.locale}`,
          //   JSON.stringify(item),
          // );

          await this.broadcaster.broadcast(channel.id, message);
        }
      }),
    );
  }

  private async scrape() {
    const promises = this.locales.map((locale) => {
      return fetch(this.getWebsite(locale), {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });
    });

    const responses = await Promise.all(promises);

    const data = await Promise.all(
      responses.map((response) => {
        return response.text();
      }),
    );

    const scrape: INews[] = [];

    for (const html of data) {
      const $ = load(html);

      const news = $('.css-ST7ZI article');

      for (const item of news) {
        const title = $(item).find('.css-BubDx a').text();
        const [date, _] = $(item)
          .find('div.u-fs-p3 time')
          .text()
          .trim()
          .split(' ');
        const type = $(item).find('div.u-fs-p3 div').text().trim();
        const image = $(item).find('.css-bHOAO').attr('src');
        const url = $(item).find('.css-BubDx a').attr('href');
        const locale =
          url?.split('/')[1] === 'news' ? 'en-US' : url?.split('/')[1];
        const key = url?.split('/').pop();

        scrape.push({
          key,
          title,
          date,
          type,
          image,
          url,
          locale,
        });
      }
    }

    return scrape;
  }

  private getWebsite(locale: string) {
    if (locale.length) {
      return `${this.website}/${locale}/news`;
    }
    return `${this.website}/news`;
  }
}
