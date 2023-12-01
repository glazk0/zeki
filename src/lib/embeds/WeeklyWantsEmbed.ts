import { bold, hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { PALIA_URL } from "../../utils/Constants.js";

import { Context } from "../../structures/Interaction.js";

import { IWeeklyWantsItem } from "../../@types/generated.js";

export class WeeklyWantsEmbed extends BaseEmbed {
	constructor(weeklyWants: IWeeklyWantsItem, { i18n }: Context) {
		super();

		const now = new Date().toLocaleDateString(i18n.locale(), {
			timeZone: "UTC",
		});

		this.data.title = i18n.embeds.weekly_wants.title();

		this.data.url = `${PALIA_URL}/tools/weekly-wants`;

		this.data.description = i18n.embeds.weekly_wants.description({
			date: bold(now),
			url: hyperlink("paliapedia.com", PALIA_URL),
		});

		const entries = weeklyWants.entries?.splice(0, Math.floor(weeklyWants.entries.length / 2));

		if (entries?.length) {
			for (const entry of entries) {
				this.addFields({
					name: `${entry.villager.name}`,
					value: entry.weeklyWants
						.map((item) => {
							return `- ${item.rewardLevel} ${hyperlink(item.item?.name as string, `${PALIA_URL}/item/${item.item?.key}`)}`;
						})
						.join("\n"),
					inline: true,
				});
			}
		}
	}
}
