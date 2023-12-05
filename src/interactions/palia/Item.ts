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

import { ItemEmbed } from "../../lib/embeds/ItemEmbed.js";

import { clientSymbol } from "../../utils/Constants.js";

import { commands } from "../../i18n/commands.js";

@injectable()
export default class Item extends Interaction {
	enabled = true;

	category = Category.Palia;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["item"],
		options: [
			{
				type: ApplicationCommandOptionType.String,
				...commands["item.query"],
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

		const item = await this.client.api.getItem(query, ctx.guild?.locale);

		if (!item)
			return interaction.reply({
				content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
				ephemeral: true,
			});

		const embed = new ItemEmbed(item, ctx);

		return interaction.reply({
			embeds: [embed],
		});
	}

	async autocomplete(interaction: AutocompleteInteraction<CacheType>, ctx: Context): Promise<void> {
		const value = interaction.options.getFocused();

		if (!value) return await interaction.respond([]);

		const data = (await this.client.api.search(value, "item", ctx.guild?.locale)).slice(0, 25);

		await interaction.respond(
			data.map((item) => ({
				name: item.name,
				value: item.key,
			})),
		);
	}
}
