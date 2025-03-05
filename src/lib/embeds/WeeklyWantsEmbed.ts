import { bold, hyperlink } from 'discord.js';

import { BaseEmbed } from './BaseEmbed.js';

import { Context } from '../../structures/Interaction.js';

import { IWeeklyWantsItem } from '../../@types/generated.js';
import { databaseUrl } from '../../utils/Commons.js';

export class WeeklyWantsEmbed extends BaseEmbed {
	constructor(weeklyWants: IWeeklyWantsItem, { locale, i18n }: Context) {
		super();

		const now = new Date().toLocaleDateString(i18n.locale(), {
			timeZone: 'UTC'
		});

		this.data.title = i18n.embeds.weekly_wants.title();

		this.data.url = databaseUrl(locale, ['tools', 'weekly-wants']);

		this.data.description = i18n.embeds.weekly_wants.description({
			date: bold(now),
			url: databaseUrl(locale)
		});

		const entries = weeklyWants.entries?.splice(0, Math.floor(weeklyWants.entries.length / 2));

		if (entries?.length) {
			for (const entry of entries) {
				this.addFields({
					name: `${entry.villager.name}`,
					value: this.toUnorderedList(
						entry.weeklyWants.map(
							(item) =>
								`${item.rewardLevel} ${hyperlink(item.item?.name as string, databaseUrl(locale, ['item', item.item?.key as string]))}`
						)
					),
					inline: true
				});
			}
		}
	}
}
