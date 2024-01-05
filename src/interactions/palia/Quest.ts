import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	AutocompleteInteraction,
	CacheType,
	ChatInputCommandInteraction,
	InteractionResponse,
	Message,
	RESTPostAPIApplicationCommandsJSONBody,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { QuestEmbed } from "../../lib/embeds/QuestEmbed.js";

import { Emoji, clientSymbol } from "../../utils/Constants.js";

import { commands } from "../../i18n/commands.js";
import { baseLocale } from "../../i18n/i18n-util.js";

@injectable()
export default class Quest extends Interaction {
	enabled = true;

	category = Category.Palia;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["quest"],
		options: [
			{
				type: ApplicationCommandOptionType.String,
				...commands["quest.query"],
				required: true,
				autocomplete: true,
			},
		],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean> | Message<boolean>> {
		const query = interaction.options.getString("query", true);

		const quest = await this.client.api.getQuest(query, ctx.guild?.locale);

		if (!quest)
			return interaction.reply({
				content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
				ephemeral: true,
			});

		const embed = new QuestEmbed(quest, null, ctx);

		let component: ActionRowBuilder<StringSelectMenuBuilder> | undefined = undefined;

		if (quest.steps?.length) {
			component = new ActionRowBuilder<StringSelectMenuBuilder>({
				components: [
					new StringSelectMenuBuilder({
						customId: "quest",
						placeholder: "Select a step",
						options: quest.steps.map((_, index) => ({
							label: `Step ${index + 1}`,
							value: `${quest.key}_${index}`
						})),
					})
				]
			});
		}

		return interaction.reply({
			embeds: [embed],
			components: component ? [component] : undefined,
		});
	}

	async autocomplete(interaction: AutocompleteInteraction<CacheType>, ctx: Context): Promise<void> {
		const value = interaction.options.getFocused();

		if (!value) return await interaction.respond([]);

		const data = (await this.client.api.search(value, "quest", ctx.guild?.locale ?? baseLocale)).slice(0, 25);

		await interaction.respond(
			data.map((item) => ({
				name: item.name,
				value: item.key,
			})),
		);
	}

	async selectMenu(interaction: StringSelectMenuInteraction<CacheType>, ctx: Context): Promise<any> {
		const [key, step] = interaction.values[0].split("_") as [string, number];

		const quest = await this.client.api.getQuest(key, ctx.guild?.locale ?? baseLocale);

		if (!quest)
			return interaction.reply({
				content: ctx.i18n.interactions.miscellaneous.no_results_for({
					query: key,
				}),
				ephemeral: true,
			});

		let component: ActionRowBuilder<StringSelectMenuBuilder> | undefined = undefined;

		if (quest.steps?.length) {
			component = new ActionRowBuilder<StringSelectMenuBuilder>({
				components: [
					new StringSelectMenuBuilder({
						customId: "quest",
						placeholder: "Select a step",
						options: quest.steps.map((_, index) => {
							return {
								label: `Step ${index + 1}`,
								value: `${quest.key}_${index}`,
								emoji: index == step ? Emoji.RightArrow : undefined,
								default: index == step,
							}
						}),
					})
				]
			});
		}

		const data = quest.steps ? quest.steps[step] : null;

		const embed = new QuestEmbed(quest, data, ctx);

		return interaction.update({
			embeds: [embed],
			components: component ? [component] : undefined,
		});
	}
}
