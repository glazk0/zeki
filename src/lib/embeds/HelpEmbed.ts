import { Collection } from "discord.js";
import { container } from "tsyringe";

import { BaseEmbed } from "./BaseEmbed.js";

import { Client } from "../../structures/Client.js";
import { Context, Interaction } from "../../structures/Interaction.js";

import { clientSymbol } from "../../utils/Constants.js";

export class HelpEmbed extends BaseEmbed {
	/**
	 * The client instance.
	 */
	private readonly client: Client;

	constructor(commands: Collection<string, Interaction>, { i18n }: Context) {
		super();

		this.client = container.resolve<Client>(clientSymbol);

		const categories = [...new Set(commands.map((command) => command.category))];

		this.data.author = {
			name: i18n.embeds.help.title({ username: this.client.user?.username }),
			icon_url: this.client.user?.displayAvatarURL(),
		};

		this.data.thumbnail = {
			url: this.client.user!.displayAvatarURL(),
		};

		this.data.description = i18n.embeds.help.description();

		for (const category of categories) {
			const commandsInCategory = commands.filter((command) => command.category === category);
			this.addFields({
				name: category,
				value: commandsInCategory.map((command) => `\`${command.command.name}\``).join(", "),
			});
		}
	}
}
