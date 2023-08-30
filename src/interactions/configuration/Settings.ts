import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  GuildChannel,
  NewsChannel,
  PermissionFlagsBits,
  PermissionResolvable,
  PermissionsBitField,
  Role,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import { inject, injectable } from 'tsyringe';
import { eq } from 'drizzle-orm';

import { Client } from '../../structures/Client';
import { Context, Interaction } from '../../structures/Interaction';

import { commands } from '../../i18n';
import { Locales } from '../../i18n/i18n-types';
import { locales } from '../../i18n/i18n-util';
import L from '../../i18n/i18n-node';

import { clientSymbol, localesMap } from '../../utils/Constants';

import { db } from '../../db';
import { guilds, news } from '../../db/schema';

@injectable()
export default class Settings extends Interaction {
  public readonly enabled = true;

  public readonly category = 'Configuration';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['settings'],
    defaultMemberPermissions:
      PermissionFlagsBits.ManageGuild.toString() as PermissionResolvable,
    dmPermission: false,
    options: [
      {
        type: ApplicationCommandOptionType.Subcommand,
        ...commands['settings.locale'],
        options: [
          {
            type: ApplicationCommandOptionType.String,
            ...commands['settings.locale.value'],
            required: true,
            choices: locales.map((locale) => ({
              name: localesMap[locale],
              value: locale,
            })),
          },
        ],
      },
      // {
      //   type: ApplicationCommandOptionType.SubcommandGroup,
      //   ...commands['settings.news'],
      //   options: [
      //     {
      //       type: ApplicationCommandOptionType.Subcommand,
      //       ...commands['settings.news.enable'],
      //       options: [
      //         {
      //           type: ApplicationCommandOptionType.Channel,
      //           ...commands['settings.news.enable.channel'],
      //           channelTypes: [
      //             ChannelType.GuildAnnouncement,
      //             ChannelType.GuildText,
      //             ChannelType.GuildForum,
      //             ChannelType.PublicThread,
      //           ],
      //           required: true,
      //         },
      //         //   {
      //         //     type: ApplicationCommandOptionType.Role,
      //         //     ...commands['settings.news.enable.role'],
      //         //   },
      //       ],
      //     },
      //     {
      //       type: ApplicationCommandOptionType.Subcommand,
      //       ...commands['settings.news.disable'],
      //     },
      //   ],
      // },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    { guild, i18n }: Context,
  ): Promise<any> {
    const options = interaction.options;

    const group = options.getSubcommandGroup();
    const subcommand = options.getSubcommand();

    let locale = options.getString('value') as Locales;

    let channel = options.getChannel('channel') as GuildChannel;
    let role = options.getRole('role') as Role;

    switch (subcommand) {
      case 'locale':
        try {
          await db
            .update(guilds)
            .set({ locale })
            .where(eq(guilds.guildId, interaction.guild!.id));
        } catch (error) {
          this.client.logger.error(
            `Error while updating locale for guild ${interaction.guild?.id}`,
            error,
          );
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
      case 'news':
        switch (subcommand) {
          case 'enable':
            if (!this.checkPermission(interaction, channel))
              return await interaction.reply({
                content: i18n.interactions.settings.news.no_permissions({
                  channel: channel.toString(),
                }),
                ephemeral: true,
              });

            await db
              .insert(news)
              .values({
                guildId: interaction.guild!.id,
                channel: channel.id,
              })
              .onConflictDoUpdate({
                target: [news.guildId],
                set: {
                  channel: channel.id,
                },
              });

            await interaction.reply({
              content: i18n.interactions.settings.news.enabled({
                channel: channel.toString(),
              }),
              ephemeral: true,
            });
            break;
          case 'disable':
            if (!guild.news || !guild.news.channel)
              return await interaction.reply({
                content: i18n.interactions.settings.news.not_enabled(),
                ephemeral: true,
              });

            await db
              .delete(news)
              .where(eq(news.guildId, interaction.guild!.id));

            await interaction.reply({
              content: i18n.interactions.settings.news.disabled({
                channel: guild.news.channel,
              }),
              ephemeral: true,
            });
            break;
        }
        break;
    }
  }

  private checkPermission(
    interaction: ChatInputCommandInteraction<CacheType>,
    channel: GuildChannel | TextChannel | NewsChannel | ThreadChannel,
  ) {
    return (
      channel
        .permissionsFor(interaction.client.user)
        ?.has([
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ViewChannel,
        ]) ?? false
    );
  }
}
