import { hyperlink } from 'discord.js';

import { BaseEmbed } from './BaseEmbed.js';

import { Context } from '../../structures/Interaction.js';

import { databaseUrl, secondsToDhms } from '../../utils/Commons.js';
import { PALIA_URL } from '../../utils/Constants.js';

import {
	IDialoguesItem,
	IGatherablesItem,
	IMailMessagesItem,
	IRecipe,
	IRecipesItem,
	IStoresItem
} from '../../@types/generated.js';

export class RecipeEmbed extends BaseEmbed {
	constructor(recipe: IRecipe, amount: number, { locale, i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/items/128/${recipe.icon}.webp`
		};

		this.data.title = recipe.name;

		this.data.url = databaseUrl(locale, ['recipe', recipe.key]);

		this.data.description = recipe.description;

		if (recipe.cost) {
			this.addFields({
				name: i18n.embeds.recipe.cost(),
				value: `${recipe.cost.amount.toLocaleString(i18n.locale())} ${recipe.cost.currency?.name}`
			});

			if (recipe.craftTime) {
				this.addFields({
					name: i18n.embeds.recipe.craft_time(),
					value: secondsToDhms(recipe.craftTime * amount)
				});
			}
		}

		if (recipe.ingredients && recipe.ingredients.length > 0) {
			this.addFields({
				name: i18n.embeds.recipe.required_ingredients(),
				value: super.toUnorderedList(
					recipe.ingredients.map((ingredient) => {
						if (ingredient.item)
							return `x${ingredient.quantity * amount} ${hyperlink(ingredient.item.name, databaseUrl(locale, ['item', ingredient.item.key]))}`;
						else if (ingredient.tag) {
							return `x${ingredient.quantity * amount} ${ingredient.tag.name}`;
						}
					})
				)
			});
		}

		if (recipe.outputItem && recipe.outputQuantity) {
			this.addFields({
				name: i18n.embeds.recipe.produces(),
				value: `- ${recipe.outputQuantity * amount}x ${hyperlink(recipe.outputItem.name, databaseUrl(locale, ['item', recipe.outputItem.key]))}`
			});
		}

		if (recipe.sources) {
			for (const [key, value] of Object.entries(recipe.sources)) {
				if (key === 'stores') {
					this.addFields({
						name: i18n.embeds.recipe.sold_at(),
						value: super.toUnorderedList(
							(value as IStoresItem[]).map((store) => hyperlink(store.name, databaseUrl(locale, ['store', store.key])))
						)
					});
				} else if (key === 'dialogues') {
					this.addFields({
						name: i18n.embeds.recipe.vendors(),
						value: super.toUnorderedList(
							(value as IDialoguesItem[]).map((vendor) =>
								hyperlink(vendor.name, databaseUrl(locale, ['dialogue', vendor.key]))
							)
						)
					});
				} else if (key === 'gatherables') {
					this.addFields({
						name: i18n.embeds.recipe.gatherables(),
						value: super.toUnorderedList(
							(value as IGatherablesItem[]).map((gatherable) =>
								hyperlink(gatherable.name, databaseUrl(locale, ['gatherable', gatherable.key]))
							)
						)
					});
				} else if (key === 'mailMessages') {
					this.addFields({
						name: i18n.embeds.recipe.mail(),
						value: super.toUnorderedList(
							(value as IMailMessagesItem[]).map((mail) =>
								hyperlink(mail?.name ?? 'Unknown', databaseUrl(locale, ['mail-message', mail.key]))
							)
						)
					});
				} else if (key === 'recipes') {
					this.addFields({
						name: i18n.embeds.recipe.recipes(),
						value: super.toUnorderedList(
							(value as IRecipesItem[]).map(
								(recipe) =>
									recipe.key && hyperlink(recipe.name ?? 'Unknown', databaseUrl(locale, ['recipe', recipe.key]))
							)
						)
					});
					// } else if (key === 'interactables') {

					// } else if (key === 'items') {

					// } else if (key === 'books') {
				}
			}
		}
	}
}
