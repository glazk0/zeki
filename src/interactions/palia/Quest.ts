import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
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
import { clientSymbol } from '../../utils/Constants';
import { QuestEmbed } from '../../lib/embeds/QuestEmbed';
import { api } from '../../lib/API';

@injectable()
export default class Quest extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['quest'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['quest.query'],
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
    let query = interaction.options.getString('query', true);

    const quest = await api.getQuest(query);

    if (!quest)
      return interaction.reply({
        content: 'No results found.',
        ephemeral: true,
      });

    const embed = new QuestEmbed(quest, null, ctx);

    const dropdown =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('quest')
          .setPlaceholder('Select a step')
          .addOptions(
            quest.steps?.map((step: any, index: number) => ({
              label: `Step ${index + 1}`,
              value: `${quest.key}_${index}`,
            })) || [],
          ),
      );

    return interaction.reply({
      embeds: [embed],
      components: [dropdown],
    });
  }

  public async autocomplete(
    interaction: AutocompleteInteraction<CacheType>,
    context: Context,
  ): Promise<void> {
    const value = interaction.options.getFocused();

    if (!value) return await interaction.respond([]);

    const data = (await api.search(value, 'quest')).slice(0, 25);

    await interaction.respond(
      data.map((item: any) => ({
        name: item.name,
        value: item.key,
      })),
    );
  }

  public async selectMenu(
    interaction: StringSelectMenuInteraction<CacheType>,
    context: Context,
  ): Promise<any> {
    const [key, step] = interaction.values[0].split('_') as [string, number];

    const quest = await api.getQuest(key);

    if (!quest)
      return interaction.reply({
        content: 'No results found.',
        ephemeral: true,
      });

    const data = quest.steps ? quest.steps[step] : null;

    const embed = new QuestEmbed(quest, data, context);

    return interaction.update({
      embeds: [embed],
    });
  }
}
