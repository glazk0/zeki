import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, CacheType, ChatInputCommandInteraction, InteractionResponse } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { ItemEmbed } from "../../lib/embeds/ItemEmbed.js";

import { clientSymbol } from "../../utils/Constants.js";

import { commands } from "../../i18n/commands.js";

@injectable()
export default class Item extends Interaction {
	public enabled = true;

	public readonly category = Category.Palia;

	public readonly command: ApplicationCommandData = {
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

	public async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		let query = interaction.options.getString("query", true);

		const item = await this.client.api.getItem(query);

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

	public async autocomplete(interaction: AutocompleteInteraction<CacheType>): Promise<void> {
		const value = interaction.options.getFocused();

		if (!value) return await interaction.respond([]);

		const data = (await this.client.api.search(value, "item")).slice(0, 25);

		await interaction.respond(
			data.map((item) => ({
				name: item.name,
				value: item.key,
			})),
		);
	}
}
