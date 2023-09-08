import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { inject, injectable } from 'tsyringe';

import { Client } from '../../structures/Client';
import { Context, Interaction } from '../../structures/Interaction';

import { commands } from '../../i18n';
import { WeeklyWantsEmbed } from '../../lib/embeds/WeeklyWantsEmbed';
import { IWeeklyWantsEntry } from '../../types';
import { clientSymbol } from '../../utils/Constants';

@injectable()
export default class Weekly extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['weekly'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['weekly.villager'],
        required: true,
        autocomplete: true,
      },
    ],
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    ctx: Context,
  ): Promise<InteractionResponse<boolean>> {
    const query = interaction.options.getString('villager', true);

    const villager = (await this.client.api.getWeeklyWants(
      query,
    )) as IWeeklyWantsEntry;

    if (!villager)
      return interaction.reply({
        content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
        ephemeral: true,
      });

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder({
        label: `See ${villager.villager.name} details`,
        style: ButtonStyle.Primary,
        custom_id: `villager_${villager.villager.key}`,
      }),
    );

    const embed = new WeeklyWantsEmbed(villager);

    return interaction.reply({
      embeds: [embed],
      components: [button],
    });
  }

  public async autocomplete(
    interaction: AutocompleteInteraction<CacheType>,
  ): Promise<void> {
    const value = interaction.options.getFocused();

    if (!value) return await interaction.respond([]);

    const data = await this.client.api.search(value, 'villager');

    await interaction.respond(
      data.map((item) => ({
        name: item.name,
        value: item.key,
      })),
    );
  }
}
