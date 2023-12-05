import { load } from "cheerio";
import { ShardClientUtil, ShardingManager } from "discord.js";
import { eq, inArray } from "drizzle-orm";

import { logger } from "../Logger.js";
import { Job } from "./Job.js";

import { NewsEmbed } from "../embeds/NewsEmbed.js";

import { duration } from "../../utils/Commons.js";

import { db } from "../../db/index.js";
import { guilds, guildsNews } from "../../db/schema/Guild.js";
import { news } from "../../db/schema/News.js";

import { INews } from "../../@types/index.js";

export class News extends Job {
	name = "News Notifier";

	schedule = "*/10 * * * *";

	delay = duration.seconds(30);

	/**
	 * The shard manager instance.
	 */
	private readonly manager: ShardingManager;

	/**
	 * List of the supported locales by Palia.
	 */
	private locales = ["", "fr-FR", "de-DE", "it-IT", "es-ES"];

	/**
	 * The Palia website.
	 */
	private website = "https://www.palia.com";

	constructor(manager: ShardingManager) {
		super();

		this.manager = manager;
	}

	async run(): Promise<void> {
		let data = await this.scrape();

		if (!data.length) return logger.error("Failed to fetch news data.");

		const exists = await db
			.select({
				key: news.key,
			})
			.from(news)
			.where(
				inArray(
					news.key,
					data.filter((item) => item.key).map((item) => item.key as string),
				),
			);

		const existingKeysSet = new Set(exists.map((item) => item.key));

		data = data.filter((item) => !existingKeysSet.has(item.key as string));

		if (!data.length) return;

		logger.info(`Inserting ${data.length} news.`);

		await db.insert(news).values(
			data.map((item) => {
				return {
					key: item.key as string,
					title: item.title as string,
					locale: item.locale as string,
				};
			}),
		);

		logger.info(`Inserted ${data.length} news.`);

		const settings = await db.select().from(guilds).innerJoin(guildsNews, eq(guildsNews.guildId, guilds.guildId));

		if (!settings || !settings.length) return logger.error("No settings found.");

		const embeds = data.reduce(
			(acc, item) => {
				const embed = new NewsEmbed(item);

				if (!item.locale) return acc;

				if (!acc[item.locale]) acc[item.locale] = [];

				acc[item.locale].push(embed);

				return acc;
			},
			{} as Record<string, NewsEmbed[]>,
		);

		await this.manager.broadcastEval(
			async (client, { settings, embeds }) => {
				const shardSettings = settings.filter((s) => ShardClientUtil.shardIdForGuildId(s.guilds.guildId, client.options.shardCount as number) === client.shard?.ids[0]);

				for (const setting of shardSettings) {
					const channel = client.channels.cache.get(setting.guilds_news.channel);

					if (!channel || !channel.isTextBased()) continue;

					const localeEmbeds = embeds[setting.guilds.locale];

					if (!localeEmbeds) continue;

					for (const embed of localeEmbeds) {
						await channel.send({ embeds: [embed] });
					}
				}
			},
			{
				context: {
					settings,
					embeds,
				},
			},
		);
	}

	private async scrape(): Promise<INews[]> {
		const scrape: INews[] = [];

		for (const locale of this.locales) {
			const response = await fetch(this.url(locale), {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
			});

			const html = await response.text();
			const $ = load(html);

			const news = $(".css-ST7ZI article");

			news.each((_, item) => {
				const title = $(item).find(".css-BubDx a").text();
				const [date, type] = $(item)
					.find("div.u-fs-p3")
					.text()
					.split("|")
					.map((item) => item.trim());
				const image = $(item).find(".css-bHOAO").attr("src");
				const url = $(item).find(".css-BubDx a").attr("href");
				const locale = url?.split("/")[1] === "news" ? "en-US" : url?.split("/")[1];
				const key = url?.split("/").pop();

				scrape.push({
					key,
					title,
					date,
					type,
					image: image ? `https:${image} ` : undefined,
					url: `${this.website}${url} `,
					locale: locale?.split("-")[0],
				});
			});
		}

		return scrape.reverse();
	}

	private url(locale: string) {
		if (locale.length) {
			return `${this.website}/${locale}/news`;
		}
		return `${this.website}/news`;
	}
}
