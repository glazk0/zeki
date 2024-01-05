import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { secondsToDhms } from "../../utils/Commons.js";
import { PALIA_URL } from "../../utils/Constants.js";

import { IDialoguesItem, IGatherablesItem, IMailMessagesItem, IRecipe, IRecipesItem, IStoresItem } from "../../@types/generated.js";

export class RecipeEmbed extends BaseEmbed {
	constructor(recipe: IRecipe, amount: number, { i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/items/128/${recipe.icon}.webp`,
		};

		this.data.title = recipe.name;
		this.data.description = recipe.description;

		this.data.url = `${PALIA_URL}/recipe/${recipe.key}`;

		if (recipe.cost) {
			this.addFields({
				name: i18n.embeds.recipe.cost(),
				value: `${recipe.cost.amount.toLocaleString(i18n.locale())} ${recipe.cost.currency?.name}`,
			});

			if (recipe.craftTime) {
				this.addFields({
					name: i18n.embeds.recipe.craft_time(),
					value: secondsToDhms(recipe.craftTime * amount),
				});
			}
		}

		if (recipe.ingredients && recipe.ingredients.length > 0) {
			this.addFields({
				name: i18n.embeds.recipe.required_ingredients(),
				value: recipe.ingredients
					.map((ingredient) => {
						if (ingredient.item) return `- x${ingredient.quantity * amount} ${hyperlink(ingredient.item.name, `${PALIA_URL}/item/${ingredient.item.key}`)}`;
						else if (ingredient.tag) {
							return `- x${ingredient.quantity * amount} ${ingredient.tag.name}`;
						}
					})
					.join("\n"),
			});
		}

		if (recipe.outputItem && recipe.outputQuantity) {
			this.addFields({
				name: i18n.embeds.recipe.produces(),
				value: `- ${recipe.outputQuantity * amount}x ${hyperlink(recipe.outputItem.name, `${PALIA_URL}/item/${recipe.outputItem.key}`)}`,
			});
		}

		if (recipe.sources) {
			for (const [key, value] of Object.entries(recipe.sources)) {
				if (key === "stores") {
					this.addFields({
						name: i18n.embeds.recipe.sold_at(),
						value: (value as IStoresItem[])
							.slice(0, 3)
							.map((quest) => `- ${hyperlink(quest.name, `${PALIA_URL}/store/${quest.key}`)}`).join("\n"),
					});
				} else if (key === "dialogues") {
					this.addFields({
						name: i18n.embeds.recipe.vendors(),
						value: (value as IDialoguesItem[])
							.slice(0, 3)
							.map((vendor) => `- ${hyperlink(vendor.name, `${PALIA_URL}/dialogue/${vendor.key}`)}`).join("\n"),
					});
				} else if (key === "gatherables") {
					this.addFields({
						name: i18n.embeds.recipe.gatherables(),
						value: (value as IGatherablesItem[])
							.slice(0, 3)
							.map((gatherable) => `- ${hyperlink(gatherable.name, `${PALIA_URL}/gatherable/${gatherable.key}`)}`).join("\n"),
					});
				} else if (key === "mailMessages") {
					this.addFields({
						name: i18n.embeds.recipe.mail(),
						value: (value as IMailMessagesItem[])
							.slice(0, 3)
							.map((mail) => `- ${hyperlink(mail?.name ?? "Unknown", `${PALIA_URL}/mail-messages/${mail.key}`)}`).join("\n"),
					});
				} else if (key === "recipes") {
					this.addFields({
						name: i18n.embeds.recipe.recipes(),
						value: (value as IRecipesItem[])
							.slice(0, 3)
							.map((recipe) => `- ${hyperlink(recipe.name!, `${PALIA_URL}/recipe/${recipe.key}`)}`).join("\n"),
					});
					// } else if (key === 'interactables') {

					// } else if (key === 'items') {

					// } else if (key === 'books') {
				}
			}
		}
	}
}
