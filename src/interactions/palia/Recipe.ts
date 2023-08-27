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
import { RecipeEmbed } from '../../lib/embeds/RecipeEmbed';

@injectable()
export default class Recipe extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['recipe'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['recipe.query'],
        required: true,
        autocomplete: true,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        ...commands['recipe.amount'],
        required: false,
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
    let amount = interaction.options.getInteger('amount', false) ?? 1;

    const recipe = await api.getRecipe(query);

    if (!recipe)
      return interaction.reply({
        content: 'No results found.',
        ephemeral: true,
      });

    if (amount < 1 || amount > 9999) amount = 1;

    const embed = new RecipeEmbed(recipe, amount, ctx);

    // const dropdown =
    //   new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    //     new StringSelectMenuBuilder()
    //       .setCustomId('quest')
    //       .setPlaceholder('Select a step')
    //       .addOptions(
    //         quest.steps?.map((step: any, index: number) => ({
    //           label: `Step ${index + 1}`,
    //           value: `${quest.key}_${index}`,
    //         })) || [],
    //       ),
    //   );

    return interaction.reply({
      embeds: [embed],
      //   components: [dropdown],
    });
  }

  public async autocomplete(
    interaction: AutocompleteInteraction<CacheType>,
    context: Context,
  ): Promise<void> {
    const value = interaction.options.getFocused();

    if (!value) return await interaction.respond([]);

    const data = (await api.search(value, 'recipe')).slice(0, 25);

    await interaction.respond(
      data.map((item: any) => ({
        name: item.name,
        value: item.key,
      })),
    );
  }
}
