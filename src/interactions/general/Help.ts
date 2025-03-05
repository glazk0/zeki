import {
	ActionRowBuilder,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
	CacheType,
	ChatInputCommandInteraction,
	Collection,
	InteractionResponse,
	RESTPostAPIApplicationCommandsJSONBody
} from 'discord.js';
import { inject, injectable } from 'tsyringe';

import { Client } from '../../structures/Client.js';
import { Category, Context, Interaction } from '../../structures/Interaction.js';

import { HelpEmbed } from '../../lib/embeds/HelpEmbed.js';

import { BOT_PERMISSIONS, SUPPORT_SERVER, clientSymbol } from '../../utils/Constants.js';

import { commands } from '../../i18n/commands.js';

@injectable()
export default class Help extends Interaction {
	enabled = true;

	category = Category.General;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands['help']
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		let commands = new Collection(this.client.interactions);

		commands = commands.filter((command) => command.enabled);

		const embed = new HelpEmbed(commands, ctx);

		const components = new ActionRowBuilder<ButtonBuilder>({
			components: [
				new ButtonBuilder({
					label: 'Invite me',
					style: ButtonStyle.Link,
					url: this.client.generateInvite(BOT_PERMISSIONS)
				}),
				new ButtonBuilder({
					label: `${this.client.user?.username} support`,
					style: ButtonStyle.Link,
					url: SUPPORT_SERVER
				})
			]
		});

		return await interaction.reply({
			embeds: [embed],
			components: [components]
		});
	}
}
