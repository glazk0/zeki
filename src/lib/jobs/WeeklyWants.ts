import "reflect-metadata";

import { ShardClientUtil, ShardingManager } from "discord.js";
import { eq } from "drizzle-orm";

import { logger } from "../Logger.js";
import { Job } from "./Job.js";

import { request } from "../../utils/Commons.js";
import { PALIA_API_URL } from "../../utils/Constants.js";

import { IWeeklyWantsItem } from "../../@types/generated.js";

import { db } from "../../db/client.js";
import { guilds, guildsNews } from "../../db/schema.js";

import L from "../../i18n/i18n-node.js";
import { locales } from "../../i18n/i18n-util.js";

import { WeeklyWantsEmbed } from "../embeds/WeeklyWantsEmbed.js";

export class WeeklyWants extends Job {
	name = "Weekly Wants";

	schedule = "0 */1 * * 1";

	/**
	 * The shard manager instance.
	 */
	private readonly manager: ShardingManager;

	/**
	 * The version of the weekly wants data.
	 */
	private version: number | undefined;

	constructor(manager: ShardingManager) {
		super();

		this.manager = manager;
	}

	async run(): Promise<void> {
		const data = await request<IWeeklyWantsItem>(`${PALIA_API_URL}/tools/weekly-wants/api/${this.version ?? Date.now()}`);

		if (!data) return logger.error("Failed to fetch weekly wants data.");

		if (!this.version) {
			this.version = data.version;
			return logger.info("Weekly wants initialized.");
		}

		if (this.version === data.version) return;

		this.version = data.version;

		const settings = await db.select().from(guilds).innerJoin(guildsNews, eq(guildsNews.guildId, guilds.guildId));

		if (!settings?.length) return logger.error("No settings found.");

		const embeds = locales.reduce(
			(acc, locale) => {
				acc[locale] = new WeeklyWantsEmbed(data, {
					i18n: L[locale],
					locale,
				});
				return acc;
			},
			{} as Record<string, WeeklyWantsEmbed>,
		);

		await this.manager.broadcastEval(
			async (client, { settings, embeds }) => {
				const shardSettings = settings.filter((s) => ShardClientUtil.shardIdForGuildId(s.guilds.guildId, client.options.shardCount as number) === client.shard?.ids[0]);

				for (const setting of shardSettings) {
					const channel = client.channels.cache.get(setting.guilds_news.channel);

					if (!channel || !channel.isTextBased()) continue;

					await channel.send({ embeds: [embeds[setting.guilds.locale]] }).catch(() => {});
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
}
