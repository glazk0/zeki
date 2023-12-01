import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandType, CacheType, ChatInputCommandInteraction, InteractionResponse, StringSelectMenuBuilder } from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../structures/Client.js";
import { Category, Context, Interaction } from "../../structures/Interaction.js";

import { clientSymbol } from "../../utils/Constants.js";

import { IWeeklyWantsItem } from "../../@types/generated.js";

import { commands } from "../../i18n/commands.js";

@injectable()
export default class Weekly extends Interaction {
	public enabled = true;

	public readonly category = Category.Palia;

	public readonly command: ApplicationCommandData = {
		type: ApplicationCommandType.ChatInput,
		...commands["weekly"],
	};

	constructor(@inject(clientSymbol) private client: Client) {
		super();
	}

	public async run(interaction: ChatInputCommandInteraction<CacheType>, ctx: Context): Promise<InteractionResponse<boolean>> {
		const villager = (await this.client.api.getWeeklyWants()) as IWeeklyWantsItem;

		const villagers = villager.entries?.map((entry) => {
			return {
				label: entry.villager.name,
				value: entry.villager.key,
			};
		});

		const list = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder({
				custom_id: "villager",
				placeholder: "Select a villager",
				options: villagers,
			}),
		);

		return interaction.reply({
			components: [list],
		});
	}
}
