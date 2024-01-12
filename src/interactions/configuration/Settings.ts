import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	CacheType,
	ChannelType,
	ChatInputCommandInteraction,
	GuildChannel,
	NewsChannel,
	PermissionFlagsBits,
	RESTPostAPIApplicationCommandsJSONBody,
	Role,
	TextChannel,
	ThreadChannel,
	channelMention,
} from "discord.js";
import { eq } from "drizzle-orm";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { commands } from "../../i18n/commands.js";
import L from "../../i18n/i18n-node.js";
import { Locales } from "../../i18n/i18n-types.js";
import { locales } from "../../i18n/i18n-util.js";

import { clientSymbol, localesMap } from "../../utils/Constants.js";

import { db } from "../../db/client.js";
import { guilds, guildsNews } from "../../db/schema.js";

@injectable()
export default class Settings extends Interaction {
	enabled = true;

	category = Category.Configuration;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands["settings"],
		default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
		dm_permission: false,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				...commands["settings.locale"],
				options: [
					{
						type: ApplicationCommandOptionType.String,
						...commands["settings.locale.value"],
						required: true,
						choices: locales.map((locale) => ({
							name: localesMap[locale],
							value: locale,
						})),
					},
				],
			},
			{
				type: ApplicationCommandOptionType.SubcommandGroup,
				...commands["settings.news"],
				options: [
					{
						type: ApplicationCommandOptionType.Subcommand,
						...commands["settings.news.enable"],
						options: [
							{
								type: ApplicationCommandOptionType.Channel,
								...commands["settings.news.enable.channel"],
								channel_types: [ChannelType.GuildAnnouncement, ChannelType.GuildText, ChannelType.GuildForum, ChannelType.PublicThread],
								required: true,
							},
							//   {
							//     type: ApplicationCommandOptionType.Role,
							//     ...commands['settings.news.enable.role'],
							//   },
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						...commands["settings.news.disable"],
					},
				],
			},
		],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, { guild, i18n }: Context): Promise<any> {
		const options = interaction.options;

		const group = options.getSubcommandGroup();
		const subcommand = options.getSubcommand();

		let locale = options.getString("value") as Locales;

		let channel = options.getChannel("channel") as GuildChannel;
		let role = options.getRole("role") as Role;

		switch (subcommand) {
			case "locale":
				try {
					await db
						.update(guilds)
						.set({ locale })
						.where(eq(guilds.guildId, interaction.guildId as string));
				} catch (error) {
					this.client.logger.error(`Error while updating locale for guild ${interaction.guild?.id}: ${error}`);
				}

				await interaction.reply({
					content: L[locale].interactions.settings.locale.success({
						locale: localesMap[locale as Locales],
					}),
					ephemeral: true,
				});
				break;
		}

		switch (group) {
			case "news":
				switch (subcommand) {
					case "enable":
						if (!this.checkPermission(interaction, channel))
							return await interaction.reply({
								content: i18n.interactions.miscellaneous.no_permissions({
									channel: channel.toString(),
								}),
								ephemeral: true,
							});

						try {
							await db
								.insert(guildsNews)
								.values({
									guildId: interaction.guild!.id,
									channel: channel.id,
								})
								.onConflictDoUpdate({
									target: [guildsNews.guildId],
									set: {
										channel: channel.id,
									},
								});
						} catch (error) {
							this.client.logger.error(`Error while updating news channel for guild ${interaction.guild?.id}: ${error}`);
						}

						await interaction.reply({
							content: i18n.interactions.settings.news.enabled({
								channel: channel.toString(),
							}),
							ephemeral: true,
						});
						break;
					case "disable":
						if (!guild?.news || !guild?.news.channel)
							return await interaction.reply({
								content: i18n.interactions.settings.news.not_enabled(),
								ephemeral: true,
							});

						try {
							await db.delete(guildsNews).where(eq(guildsNews.guildId, interaction.guildId as string));
						} catch (error) {
							this.client.logger.error(`Error while updating news channel for guild ${interaction.guild?.id} to null: ${error}`);
						}

						await interaction.reply({
							content: i18n.interactions.settings.news.disabled({
								channel: channelMention(guild.news.channel),
							}),
							ephemeral: true,
						});
						break;
				}
				break;
		}
	}

	private checkPermission(interaction: ChatInputCommandInteraction<CacheType>, channel: GuildChannel | TextChannel | NewsChannel | ThreadChannel) {
		return channel.permissionsFor(interaction.client.user)?.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]) ?? false;
	}
}
