import { load } from "cheerio";
import { ShardClientUtil, ShardingManager } from "discord.js";
import { eq } from "drizzle-orm";

import { logger } from "../Logger.js";
import { Job } from "./Job.js";

import { NewsEmbed } from "../embeds/NewsEmbed.js";

import { duration } from "../../utils/Commons.js";

import { db } from "../../db/index.js";
import { guilds, guildsNews } from "../../db/schema/Guild.js";

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
		const data = await this.scrape();

		console.log(data);

		if (!data.length) return logger.error("Failed to fetch news data.");

		// TODO - Handle database filtering

		const settings = await db.select().from(guilds).innerJoin(guildsNews, eq(guildsNews.guildId, guilds.guildId));

		if (!settings || !settings.length) return logger.error("No settings found.");

		const embeds = data.reduce(
			(acc, item) => {
				const embed = new NewsEmbed(item);

				if (!item.locale) return acc;

				item.locale = item.locale?.split("-")[0];

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
		const promises = this.locales.map((locale) => {
			return fetch(this.url(locale), {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
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

			const news = $(".css-ST7ZI article");

			for (const item of news) {
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
					image: image ? `https:${image}` : undefined,
					url: `${this.website}${url}`,
					locale,
				});
			}
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
