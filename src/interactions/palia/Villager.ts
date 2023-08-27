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
import { VillagerEmbed } from '../../lib/embeds/VillagerEmbed';
import { api } from '../../lib/API';

@injectable()
export default class Villager extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['villager'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['villager.query'],
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

    const villager = await api.getVillager(query);

    if (!villager)
      return interaction.reply({
        content: 'No results found.',
        ephemeral: true,
      });

    const embed = new VillagerEmbed(villager, null, ctx);

    const dropdown =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('villager')
          .setPlaceholder('Select a relationship level')
          .addOptions(
            generateRelationshipLevels(villager.relationshipLevels!).map(
              (step: IRelationshipLevelsItem, index: number) => ({
                label: step.levelName,
                value: `${villager.key}_${index}`,
              }),
            ) || [],
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

    const data = await api.search(value, 'villager');

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
    const [key, relationshipLevel] = interaction.values[0].split('_') as [
      string,
      number,
    ];

    const villager = await api.getVillager(key);

    if (!villager)
      return interaction.reply({
        content: 'No results found.',
        ephemeral: true,
      });

    const data = villager.relationshipLevels
      ? villager.relationshipLevels[relationshipLevel]
      : null;

    const embed = new VillagerEmbed(villager, data, context);

    return interaction.update({
      embeds: [embed],
    });
  }
}

function generateRelationshipLevels(
  data: IRelationshipLevelsItem[],
): ReadonlyArray<IRelationshipLevelsItem> {
  const levelCounts: { [key: string]: number } = {};
  const result: IRelationshipLevelsItem[] = [];

  for (const level of data) {
    const {
      type,
      level: currentLevel,
      requiredValue,
      levelName,
      levelDescription,
    } = level;

    if (!levelCounts[type]) {
      levelCounts[type] = 1;
    }

    const levelNameWithCounter = `${type} Level ${levelCounts[type]}`;

    result.push({
      type,
      level: currentLevel,
      requiredValue,
      levelName: levelNameWithCounter,
      levelDescription,
    });

    levelCounts[type]++;
  }

  return Object.freeze(result);
}
