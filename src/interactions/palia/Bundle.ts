import {
  ActionRowBuilder,
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
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
import { BundleEmbed } from '../../lib/embeds/BundleEmbed';
import { clientSymbol } from '../../utils/Constants';

@injectable()
export default class Bundle extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['bundle'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['bundle.query'],
        required: true,
        choices: [
          {
            name: 'Vault of the Flames',
            value: 'da-firebundle',
          },
          {
            name: 'Vault of the Waves',
            value: 'da-watershrinebundle',
          },
          {
            name: "Vault of the Gales",
            value: 'da-airbundle',
          },
          {
            name: "Tamala's Mysterious Potion Brew",
            value: 'da-tamalabundle',
          }
        ],
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
    const query = interaction.options.getString('query', true);

    const bundle = await this.client.api.getBundle(query);

    if (!bundle)
      return interaction.reply({
        content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
        ephemeral: true,
      });

    const embed = new BundleEmbed(bundle, null, ctx);

    const dropdown =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('bundle')
          .setPlaceholder('Select a sub-bundle')
          .addOptions(
            bundle.subBundles?.map((subBundle, index: number) => ({
              label: subBundle.name,
              value: `${bundle.key}_${index}`,
            })) || [],
          ),
      );

    return interaction.reply({
      embeds: [embed],
      components: [dropdown],
    });
  }

  public async selectMenu(
    interaction: StringSelectMenuInteraction<CacheType>,
    ctx: Context,
  ): Promise<any> {
    const [key, index] = interaction.values[0].split('_') as [string, number];

    const bundle = await this.client.api.getBundle(key);

    if (!bundle)
      return interaction.reply({
        content: ctx.i18n.interactions.miscellaneous.no_results_for({
          query: key,
        }),
        ephemeral: true,
      });

    const data = bundle.subBundles ? bundle.subBundles[index] : null;

    const embed = new BundleEmbed(bundle, data, ctx);

    return interaction.update({
      embeds: [embed],
    });
  }
}
