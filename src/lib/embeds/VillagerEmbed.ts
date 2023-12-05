import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { PALIA_URL } from "../../utils/Constants.js";

import { IRelationshipLevelsItem, IVillager } from "../../@types/generated.js";

export class VillagerEmbed extends BaseEmbed {
	constructor(villager: IVillager, relationshipLevel: IRelationshipLevelsItem | null, { i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/villagers/128/${villager.icon}.webp`,
		};

		this.data.title = villager.name;
		this.data.description = villager.description;

		this.data.url = `${PALIA_URL}/villager/${villager.key}`;

		if (villager.giftPreferences?.length) {
			this.addFields({
				name: i18n.embeds.villager.gift_preferences(),
				value: villager.giftPreferences
					.map((gift) => {
						if (!gift.item) return;
						return `- ${gift.rewardLevel} ${hyperlink(gift.item.name, `${PALIA_URL}/item/${gift.item.key}`)}`;
					})
					.splice(0, 5)
					.concat(
						hyperlink(
							i18n.embeds.miscellaneous.see_more({
								count: villager.giftPreferences.length - 5,
							}),
							`${PALIA_URL}/villager/${villager.key}`,
						),
					)
					.join("\n"),
			});
		}

		if (villager.weeklyGiftPreferences?.length) {
			this.addFields({
				name: i18n.embeds.villager.weekly_wants(),
				value: villager.weeklyGiftPreferences
					.map((gift) => {
						if (!gift.item) return;
						return `- ${gift.rewardLevel} ${hyperlink(gift.item.name, `${PALIA_URL}/item/${gift.item.key}`)}`;
					})
					.join("\n"),
			});
		}

		if (relationshipLevel) {
			this.addFields({
				name: i18n.embeds.villager.relationship({
					type: relationshipLevel.type,
					level: relationshipLevel.level,
					levelName: relationshipLevel.levelName,
					requiredValue: relationshipLevel.requiredValue,
				}),
				value: relationshipLevel.levelDescription ?? i18n.embeds.miscellaneous.no_data(),
			});
		}
	}
}
