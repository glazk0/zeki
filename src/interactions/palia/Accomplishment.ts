import {
  ApplicationCommandData,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from 'discord.js';
import { inject, injectable } from 'tsyringe';

import { Client } from '../../structures/Client';
import { Context, Interaction } from '../../structures/Interaction';

import { commands } from '../../i18n';
import { clientSymbol } from '../../utils/Constants';
import { AccomplishmentEmbed } from '../../lib/embeds/AccomplishmentEmbed';

@injectable()
export default class Accomplishment extends Interaction {
  public enabled = true;

  public readonly category = 'Palia';

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    ...commands['accomplishment'],
    options: [
      {
        type: ApplicationCommandOptionType.String,
        ...commands['accomplishment.query'],
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

    const accomplishment = await this.client.api.getAccomplishment(query);

    if (!accomplishment)
      return interaction.reply({
        content: ctx.i18n.interactions.miscellaneous.no_results_for({ query }),
        ephemeral: true,
      });

    const embed = new AccomplishmentEmbed(accomplishment, ctx);

    return interaction.reply({
      embeds: [embed],
    });
  }

  public async autocomplete(
    interaction: AutocompleteInteraction<CacheType>,
  ): Promise<void> {
    const value = interaction.options.getFocused();

    if (!value) return await interaction.respond([]);

    const data = (await this.client.api.search(value, 'accomplishment')).slice(
      0,
      25,
    );

    await interaction.respond(
      data.map((item) => ({
        name: item.name,
        value: item.key,
      })),
    );
  }
}
