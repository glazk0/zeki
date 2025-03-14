import { CacheType, CommandInteraction, Events, StringSelectMenuInteraction } from 'discord.js';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'tsyringe';

import { Client } from '../structures/Client.js';
import { Event } from '../structures/Event.js';
import { Context, Interaction } from '../structures/Interaction.js';

import { clientSymbol, discordToPalia } from '../utils/Constants.js';

import { db, findOrCreate } from '../db/client.js';
import { guilds, logs, type GuildWithSettings } from '../db/schema.js';

import L from '../i18n/i18n-node.js';
import { Locales } from '../i18n/i18n-types.js';
import { baseLocale } from '../i18n/i18n-util.js';

@injectable()
export default class InteractionCreate extends Event {
	constructor(@inject(clientSymbol) private client: Client) {
		super('onInteraction', Events.InteractionCreate);
	}

	public async run(interaction: CommandInteraction<CacheType>): Promise<any> {
		if (!this.client.isReady() || !interaction) return undefined;

		const locale = discordToPalia[interaction.locale] ?? baseLocale;

		let guild: GuildWithSettings | undefined;

		const context = {
			locale,
			i18n: L[locale]
		} as Context;

		if (interaction.inGuild()) {
			guild = await findOrCreate(interaction.guildId);

			if (guild) {
				context.locale = guild.locale as Locales;
				context.i18n = L[guild.locale as Locales];
				context.guild = guild;
			}

			if (interaction.isChatInputCommand())
				await db.update(guilds).set({ lastSeen: new Date() }).where(eq(guilds.guildId, interaction.guildId));
		}

		let command: Interaction | undefined = undefined;

		if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
			if (!this.client.interactions.has(interaction.commandName)) return undefined;
			command = this.client.interactions.get(interaction.commandName);
		}

		if (interaction.isChatInputCommand()) {
			this.client.logger.info(`Command ${command?.command?.name} was executed in ${interaction.guildId || 'DM'}`);

			try {
				await command?.run(interaction, context);
				await db.insert(logs).values({
					command: interaction.commandName,
					guildId: context.guild?.guildId
				});
			} catch (error) {
				this.client.logger.error(`Failed to run interaction ${interaction.commandName}: ${error}`);
			}
		}

		if (interaction.isAutocomplete()) {
			try {
				await command?.autocomplete?.(interaction, context);
			} catch (error) {
				this.client.logger.error(`Failed to run autocomplete for interaction ${command?.command.name}: ${error}`);
			}
		}

		if (interaction.isStringSelectMenu()) {
			const selectMenu = interaction as StringSelectMenuInteraction;

			const id = selectMenu.customId.split('_')[0];

			if (!this.client.interactions.has(id)) return undefined;

			command = this.client.interactions.get(id);

			if (!command) return undefined;

			try {
				await command.selectMenu?.(interaction, context);
			} catch (error) {
				this.client.logger.error(`Failed to run interaction ${selectMenu.customId}: ${error}`);
			}
		}
	}
}
