import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { PALIA_URL } from "../../utils/Constants.js";
import { databaseUrl } from "../../utils/Commons.js";

import { IBundle, ISubBundlesItem } from "../../@types/generated.js";

export class BundleEmbed extends BaseEmbed {
	constructor(bundle: IBundle, subBundle: ISubBundlesItem | null, { locale, i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/bundles/128/${bundle.icon}.webp`,
		};

		this.data.title = subBundle ? `${subBundle.name} - ${bundle.name}` : bundle.name;

		this.data.url = databaseUrl(locale, ["bundle", bundle.key]);

		this.addFields({
			name: "Rewards",
			value: bundle.rewards
				.map((reward) => {
					if (reward.type === "PlayerTagWriteback") {
						return `- ${reward.amount}x ${reward.tag?.key} (WIP)`;
					} else if (reward.type === "item") {
						return `- ${reward.amount}x ${hyperlink(reward.item?.name || "Unknown item", `${PALIA_URL}/item/${reward.item?.key}`)}`;
					} else {
						return `- ${reward.amount}x ${reward.type} (WIP)`;
					}
				})
				.join("\n"),
		});

		if (subBundle) {
			this.addFields({
				name: "Items",
				value: subBundle.requiredItems
					.map((item) => {
						return `- ${item.amount}x ${hyperlink(item.item?.name || "Unknown item", `${PALIA_URL}/item/${item.item?.key}`)} ${item.starQuality ? "⭐" : ""}`;
					})
					.join("\n"),
			});

			if (subBundle.rewards?.length)
				this.addFields({
					name: `${subBundle.name} Rewards`,
					value: subBundle.rewards
						.map((reward) => {
							if (reward.type === "recipe") {
								return `- Recipe: ${hyperlink(reward.recipe?.name || "Unknown recipe", `${PALIA_URL}/recipe/${reward.recipe?.key}`)}`;
							}
							if (reward.type === "Coins") {
								return `- ${reward.amount}x ${reward.currency?.name}`;
							} else if (reward.type === "item") {
								return `- ${reward.amount}x ${hyperlink(reward.item?.name || "Unknown item", `${PALIA_URL}/item/${reward.item?.key}`)}`;
							} else {
								return `- ${reward.amount}x ${reward.type} (WIP)`;
							}
						})
						.join("\n"),
				});
		}
	}
}
