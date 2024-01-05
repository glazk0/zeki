import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	AutocompleteInteraction,
	CacheType,
	ChatInputCommandInteraction,
	InteractionResponse,
	RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { RecipeEmbed } from "../../lib/embeds/RecipeEmbed.js";

import { clientSymbol } from "../../utils/Constants.js";

import { commands } from "../../i18n/commands.js";
import { baseLocale } from "../../i18n/i18n-util.js";

@injectable()
export default class Recipe extends Interaction {
	enabled = true;

	category = Category.Palia;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["recipe"],
		options: [
			{
				type: ApplicationCommandOptionType.String,
				...commands["recipe.query"],
				required: true,
				autocomplete: true,
			},
			{
				type: ApplicationCommandOptionType.Integer,
				...commands["recipe.amount"],
				required: false,
			},
		],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		const query = interaction.options.getString("query", true);
		let amount = interaction.options.getInteger("amount", false) ?? 1;

		const recipe = await this.client.api.getRecipe(query, ctx.guild?.locale ?? baseLocale);

		if (!recipe)
			return interaction.reply({
				content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
				ephemeral: true,
			});

		amount = Math.max(1, Math.min(9999, amount));

		const embed = new RecipeEmbed(recipe, amount, ctx);

		return interaction.reply({
			embeds: [embed],
		});
	}

	async autocomplete(interaction: AutocompleteInteraction<CacheType>, ctx: Context): Promise<void> {
		const value = interaction.options.getFocused();

		if (!value) return await interaction.respond([]);

		const data = (await this.client.api.search(value, "recipe", ctx.guild?.locale ?? baseLocale)).slice(0, 25);

		await interaction.respond(
			data.map((item) => ({
				name: item.name,
				value: item.key,
			})),
		);
	}
}
