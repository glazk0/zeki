import { ApplicationCommandData, ApplicationCommandType, CacheType, ChatInputCommandInteraction, InteractionResponse } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { HelpEmbed } from "../../lib/embeds/HelpEmbed.js";

import { clientSymbol } from "../../utils/Constants.js";

import { helpersButtons } from "../../interactions/general/About.js";

import { commands } from "../../i18n/commands.js";

@injectable()
export default class Help extends Interaction {
	readonly enabled = true;

	readonly category = Category.General;

	command: ApplicationCommandData = {
		type: ApplicationCommandType.ChatInput,
		...commands["help"],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		let commands = this.client.interactions;

		commands = commands.filter((command) => command.enabled);

		const embed = new HelpEmbed(commands, ctx);

		return await interaction.reply({
			embeds: [embed],
			components: [helpersButtons],
		});
	}
}
