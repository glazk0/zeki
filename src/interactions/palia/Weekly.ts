import {
	ActionRowBuilder,
	ApplicationCommandType,
	CacheType,
	ChatInputCommandInteraction,
	InteractionResponse,
	RESTPostAPIApplicationCommandsJSONBody,
	StringSelectMenuBuilder
} from 'discord.js';
import { inject, injectable } from 'tsyringe';

import { Client } from '../../structures/Client.js';
import { Category, Context, Interaction } from '../../structures/Interaction.js';

import { clientSymbol } from '../../utils/Constants.js';

import { IWeeklyWantsItem } from '../../@types/generated.js';

import { commands } from '../../i18n/commands.js';
import { baseLocale } from '../../i18n/i18n-util.js';

@injectable()
export default class Weekly extends Interaction {
	enabled = true;

	category = Category.Palia;

	command: RESTPostAPIApplicationCommandsJSONBody = {
		type: ApplicationCommandType.ChatInput,
		...commands['weekly']
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		const villager = (await this.client.api.getWeeklyWants(
			undefined,
			ctx.guild?.locale ?? baseLocale
		)) as IWeeklyWantsItem;

		const villagers =
			villager.entries?.map((entry) => {
				return {
					label: entry.villager.name,
					value: entry.villager.key
				};
			}) ?? [];

		const components: ActionRowBuilder<StringSelectMenuBuilder>[] = [];

		for (let i = 0; i < villagers.length; i += 25) {
			const chunk = villagers.slice(i, i + 25);
			components.push(
				new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
					new StringSelectMenuBuilder({
						custom_id: `villager_${Math.floor(i / 25)}`,
						placeholder: `Select a villager (${Math.floor(i / 25) + 1}/${Math.ceil(villagers.length / 25)})`,
						options: chunk
					})
				)
			);
		}

		return interaction.reply({
			components: components.slice(0, 5)
		});
	}
}
