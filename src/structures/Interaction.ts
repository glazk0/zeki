import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, InteractionResponse, Message, RESTPostAPIApplicationCommandsJSONBody, StringSelectMenuInteraction } from "discord.js";

import { GuildWithSettings } from "../@types/index.js";

import { TranslationFunctions } from "../i18n/i18n-types.js";

export type Context = {
	guild: GuildWithSettings;
	i18n: TranslationFunctions;
};

export enum Category {
	General = "General",
	Palia = "Palia",
	Configuration = "Configuration",
}

export abstract class Interaction {
	/**
	 * Whether the interaction is enabled.
	 */
	enabled = true;

	/**
	 * The interaction category.
	 */
	category: Category = Category.General;

	/**
	 * The command data.
	 */
	command: RESTPostAPIApplicationCommandsJSONBody;

	/**
	 * Runs the interaction.
	 *
	 * @param interaction - The interaction.
	 * @param context - The context.
	 *
	 * @returns {Promise<void>}
	 */
	abstract run(interaction: ChatInputCommandInteraction<CacheType>, context: Context): Promise<InteractionResponse<boolean> | Message<boolean>>;

	/**
	 * Handles the interaction autocomplete.
	 *
	 * @param interaction - The interaction.
	 * @param context - The context.
	 */
	async autocomplete?(interaction: AutocompleteInteraction<CacheType>): Promise<void> {
		throw new Error("Not implemented");
	}

	/**
	 * Handles the interaction select menu.
	 *
	 * @param interaction - The interaction.
	 * @param context - The context.
	 */
	async selectMenu?(interaction: StringSelectMenuInteraction<CacheType>, context: Context): Promise<any> {
		throw new Error("Not implemented");
	}
}
