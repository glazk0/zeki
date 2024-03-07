import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { databaseUrl } from "../../utils/Commons.js";
import { PALIA_URL } from "../../utils/Constants.js";

import { IRelationshipLevelsItem, IVillager } from "../../@types/generated.js";

export class VillagerEmbed extends BaseEmbed {
	constructor(villager: IVillager, relationshipLevel: IRelationshipLevelsItem | null, { locale, i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/villagers/128/${villager.icon}.webp`,
		};

		this.data.title = villager.name;

		if (villager.description) this.data.description = villager.description;

		this.data.url = databaseUrl(locale, ["villager", villager.key]);

		if (villager.giftPreferences?.length) {
			this.addFields({
				name: i18n.embeds.villager.gift_preferences(),
				value: super.toUnorderedList(
					villager.giftPreferences.map((gift) => {
						if (!gift.item) return;
						return `${gift.rewardLevel} ${hyperlink(gift.item.name, databaseUrl(locale, ["item", gift.item.key]))}`;
					}),
				),
			});
		}

		if (villager.weeklyGiftPreferences?.length) {
			this.addFields({
				name: i18n.embeds.villager.weekly_wants(),
				value: super.toUnorderedList(
					villager.weeklyGiftPreferences.map((gift) => {
						if (!gift.item) return;
						return `${gift.rewardLevel} ${hyperlink(gift.item.name, databaseUrl(locale, ["item", gift.item.key]))}`;
					}),
				),
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
