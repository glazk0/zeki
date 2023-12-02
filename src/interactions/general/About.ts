import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, InteractionResponse, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { AboutEmbed } from "../../lib/embeds/AboutEmbed.js";

import { BOT_INVITE, SUPPORT_SERVER, clientSymbol } from "../../utils/Constants.js";

import { commands } from "../../i18n/commands.js";

export const helpersButtons = new ActionRowBuilder<ButtonBuilder>({
	components: [
		new ButtonBuilder({
			label: "Invite me",
			style: ButtonStyle.Link,
			url: BOT_INVITE,
		}),
		new ButtonBuilder({
			label: "Support server",
			style: ButtonStyle.Link,
			url: SUPPORT_SERVER,
		}),
		new ButtonBuilder({
			label: "GitHub",
			style: ButtonStyle.Link,
			url: "https://github.com/glazk0/zeki",
		}),
	],
});

@injectable()
export default class About extends Interaction {
	enabled = true;

	category = Category.General;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["about"],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		const guilds = await this.client.shard?.broadcastEval((client) => client.guilds.cache.size);
		const users = await this.client.shard?.broadcastEval((client) => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));

		const data = {
			guilds: guilds?.reduce((acc, guild) => acc + guild, 0) || 0,
			users: users?.reduce((acc, user) => acc + user, 0) || 0,
			shardId: interaction.guild?.shardId || 0,
		};

		const embed = new AboutEmbed(data, ctx);

		return await interaction.reply({
			embeds: [embed],
			components: [helpersButtons],
		});
	}
}
