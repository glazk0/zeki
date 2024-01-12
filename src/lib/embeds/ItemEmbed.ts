import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { PALIA_URL } from "../../utils/Constants.js";

import { IBooksItem, IDialoguesItem, IGatherablesItem, IItem, IItemsItem, IMailMessagesItem, IQuest, IRecipesItem, IStoresItem } from "../../@types/generated";

export class ItemEmbed extends BaseEmbed {
	constructor(item: IItem, { i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/items/128/${item.icon}.webp`,
		};

		this.data.title = item.name;

		if (item.description) this.data.description = item.description;

		this.data.url = `${PALIA_URL}/item/${item.key}`;

		if (item.category)
			this.addFields({
				name: i18n.embeds.item.category(),
				value: item.category,
				inline: true,
			});

		if (item.rarity)
			this.addFields({
				name: i18n.embeds.item.rarity(),
				value: item.rarity,
				inline: true,
			});

		if (item.quality)
			this.addFields({
				name: i18n.embeds.item.quality(),
				value: item.quality,
				inline: true,
			});

		if (item.cost)
			this.addFields({
				name: i18n.embeds.item.cost(),
				value: `${item.cost.amount.toLocaleString(i18n.locale())} ${item.cost.currency?.name}`,
			});

		if (item.value)
			this.addFields({
				name: i18n.embeds.item.value(),
				value: `${item.value.amount} ${item.value.currency.name}`,
			});

		if (item.sources) {
			for (const [key, value] of Object.entries(item.sources)) {
				if (key === "stores") {
					this.addFields({
						name: i18n.embeds.item.sold_at(),
						value: super.toUnorderedList((value as IStoresItem[]).map((store) => hyperlink(store.name, `${PALIA_URL}/store/${store.key}`))),
					});
				} else if (key === "recipes") {
					this.addFields({
						name: i18n.embeds.item.crafted_by(),
						value: super.toUnorderedList((value as IRecipesItem[]).map((recipe) => hyperlink(recipe.item?.name ?? "Unknown", `${PALIA_URL}/recipe/${recipe.key}`))),
					});
				} else if (key === "gatherables") {
					this.addFields({
						name: i18n.embeds.item.gathered_from(),
						value: super.toUnorderedList((value as IGatherablesItem[]).map((gatherable) => hyperlink(gatherable.name, `${PALIA_URL}/gatherable/${gatherable.key}`))),
					});
				} else if (key === "dialogues") {
					this.addFields({
						name: i18n.embeds.item.quest_reward_from(),
						value: super.toUnorderedList((value as IDialoguesItem[]).map((dialogue) => hyperlink(dialogue.name ?? "Unknown", `${PALIA_URL}/dialogue/${dialogue.key}`))),
					});
				} else if (key === "mailMessages") {
					this.addFields({
						name: i18n.embeds.item.attached_to(),
						value: super.toUnorderedList((value as IMailMessagesItem[]).map((mail) => hyperlink(mail?.name ?? "Unknown", `${PALIA_URL}/mail-messages/${mail.key}`))),
					});
				} else if (key === "books") {
					this.addFields({
						name: i18n.embeds.item.obtained_by_reading(),
						value: super.toUnorderedList((value as IBooksItem[]).map((book) => hyperlink(book?.name ?? "Unknown", `${PALIA_URL}/item/${book.key}`))),
					});
				} else if (key === "quests") {
					this.addFields({
						name: i18n.embeds.item.reward_from(),
						value: super.toUnorderedList((value as IQuest[]).map((quest) => hyperlink(quest.name, `${PALIA_URL}/quest/${quest.key}`))),
					});
				} else if (key === "items") {
					this.addFields({
						name: i18n.embeds.item.obtained_from(),
						value: super.toUnorderedList((value as IItemsItem[]).map((item) => hyperlink(item.name ?? "Unknown", `${PALIA_URL}/item/${item.key}`))),
					});
				}
				// else {
				// 	this.addFields({
				// 		name: "WIP",
				// 		value: (value as any[]).map((unknown) => `- ${unknown}`).join("\n"),
				// 	});
				// }
			}
		}

		if (item.requiredFor) {
			for (const [key, value] of Object.entries(item.requiredFor)) {
				if (key === "recipes") {
					this.addFields({
						name: i18n.embeds.item.ingredient_for_recipe(),
						value: super.toUnorderedList((value as IRecipesItem[]).map((recipe) => hyperlink(recipe.item?.name ?? "Unknown", `${PALIA_URL}/recipe/${recipe.key}`))),
					});
				} else if (key === "quests") {
					this.addFields({
						name: i18n.embeds.item.needed_for_quest(),
						value: super.toUnorderedList((value as IQuest[]).map((quest) => hyperlink(quest.name, `${PALIA_URL}/quest/${quest.key}`))),
					});
				} else if (key === "items") {
					this.addFields({
						name: i18n.embeds.item.contains_item(),
						value: super.toUnorderedList((value as IItemsItem[]).map((item) => hyperlink(item.name ?? "Unknown", `${PALIA_URL}/item/${item.key}`))),
					});
				}
				// else {
				// 	this.addFields({
				// 		name: "WIP",
				// 		value: (value as any[]).map((unknown) => `- ${unknown}`).join("\n"),
				// 	});
				// }
			}
		}
	}
}
