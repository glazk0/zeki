import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	AutocompleteInteraction,
	ButtonInteraction,
	CacheType,
	ChatInputCommandInteraction,
	InteractionResponse,
	RESTPostAPIApplicationCommandsJSONBody,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { VillagerEmbed } from "../../lib/embeds/VillagerEmbed.js";

import { clientSymbol } from "../../utils/Constants.js";

import { IRelationshipLevelsItem } from "../../@types/generated.js";

import { commands } from "../../i18n/commands.js";

@injectable()
export default class Villager extends Interaction {
	enabled = true;

	category = Category.Palia;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["villager"],
		options: [
			{
				type: ApplicationCommandOptionType.String,
				...commands["villager.query"],
				required: true,
				autocomplete: true,
			},
		],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		const query = interaction.options.getString("query", true);

		const villager = await this.client.api.getVillager(query, ctx.guild?.locale);

		if (!villager)
			return interaction.reply({
				content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
				ephemeral: true,
			});

		const embed = new VillagerEmbed(villager, null, ctx);

		const dropdown = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("villager")
				.setPlaceholder("Select a relationship level")
				.addOptions(
					villager.relationshipLevels
						? generateRelationshipLevels(villager.relationshipLevels).map((step, index: number) => ({
								label: step.levelName,
								value: `${villager.key}_${index}`,
						  }))
						: [],
				),
		);

		return interaction.reply({
			embeds: [embed],
			components: [dropdown],
		});
	}

	async autocomplete(interaction: AutocompleteInteraction<CacheType>, ctx: Context): Promise<void> {
		const value = interaction.options.getFocused();

		if (!value) return await interaction.respond([]);

		const data = (await this.client.api.search(value, "villager", ctx.guild?.locale)).slice(0, 25);

		await interaction.respond(
			data.map((item) => ({
				name: item.name,
				value: item.key,
			})),
		);
	}

	async selectMenu(interaction: StringSelectMenuInteraction<CacheType>, context: Context): Promise<any> {
		const [key, relationshipLevel] = interaction.values[0].split("_") as [string, number];

		const villager = await this.client.api.getVillager(key, context.guild?.locale);

		if (!villager)
			return interaction.reply({
				content: context.i18n.interactions.miscellaneous.no_results_for({
					query: key,
				}),
				ephemeral: true,
			});

		const data = villager.relationshipLevels ? villager.relationshipLevels[relationshipLevel] : null;

		const embed = new VillagerEmbed(villager, data, context);

		return interaction.update({
			embeds: [embed],
		});
	}

	async button(interaction: ButtonInteraction<CacheType>, context: Context): Promise<any> {
		const [_, key] = interaction.customId.split("_") as [string, string];

		const villager = await this.client.api.getVillager(key, context.guild?.locale);

		if (!villager)
			return interaction.reply({
				content: context.i18n.interactions.miscellaneous.no_results_for({
					query: key,
				}),
				ephemeral: true,
			});

		const embed = new VillagerEmbed(villager, null, context);

		const dropdown = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("villager")
				.setPlaceholder("Select a relationship level")
				.addOptions(
					villager.relationshipLevels
						? generateRelationshipLevels(villager.relationshipLevels).map((step, index: number) => ({
								label: step.levelName,
								value: `${villager.key}_${index}`,
						  }))
						: [],
				),
		);

		return interaction.update({
			embeds: [embed],
			components: [dropdown],
		});
	}
}

function generateRelationshipLevels(data: IRelationshipLevelsItem[]): ReadonlyArray<IRelationshipLevelsItem> {
	const levelCounts: { [key: string]: number } = {};
	const result: IRelationshipLevelsItem[] = [];

	for (const level of data) {
		const { type, level: currentLevel, requiredValue, levelName, levelDescription } = level;

		if (!levelCounts[type]) {
			levelCounts[type] = 1;
		}

		const levelNameWithCounter = `${type} Level ${levelCounts[type]}`;

		result.push({
			type,
			level: currentLevel,
			requiredValue,
			levelName: levelNameWithCounter,
			levelDescription,
		});

		levelCounts[type]++;
	}

	return Object.freeze(result);
}
