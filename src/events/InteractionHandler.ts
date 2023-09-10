import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import {
  ButtonInteraction,
  CacheType,
  Collection,
  CommandInteraction,
  Events,
  StringSelectMenuInteraction,
} from 'discord.js';
import { container } from 'tsyringe';

import { Event } from '../structures/Event';
import { Context, Interaction } from '../structures/Interaction';

import { initLocales } from '../i18n';

import L from '../i18n/i18n-node';

import { findOrCreate } from '../db';
import { GuildWithSettings } from '../types';

export default class InteractionHandler extends Event {
  /**
   * The interactions collection.
   *
   * @type {Collection<string, Interaction>}
   * @readonly
   */
  private readonly interactions: Collection<string, Interaction>;

  constructor() {
    super('onInteraction', Events.InteractionCreate);

    this.interactions = new Collection<string, Interaction>();

    this.init();
  }

  /**
   * Initializes the interaction handler.
   */
  async init(): Promise<void> {
    // REFACTOR
    await initLocales();

    const dir = await readdir(join(resolve(__dirname, '..', 'interactions')));

    this.client.logger.info(`Loading ${dir.length} interactions categories.`);

    for (const category of dir) {
      const files = await readdir(
        join(resolve(__dirname, '..', 'interactions', category)),
      );

      this.client.logger.info(
        `Loading ${files.length} interactions from category ${category}.`,
      );

      for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const commandClass = (
          await import(
            join(resolve(__dirname, '..', 'interactions', category, file))
          )
        ).default;

        const interaction = container.resolve<Interaction>(commandClass);

        this.client.logger.info(
          `Loading interaction ${interaction.command.name}.`,
        );
        this.interactions.set(interaction.command.name, interaction);
      }
    }

    this.client.setInteractions(this.interactions);

    this.refresh();
  }

  /**
   * Refreshes the interactions.
   * This will update the interactions on Discord.
   */
  private async refresh() {
    const ready = this.client.readyAt
      ? Promise.resolve()
      : new Promise((resolve) => this.client.once(Events.ClientReady, resolve));

    await ready;

    const currentInteractions = await this.client.application?.commands.fetch();

    this.client.logger.info('Refreshing interactions...');

    const interactionsToUpdate = this.interactions
      .filter((interaction) => interaction.enabled)
      .map((interaction) => interaction.command);

    const newInteractions = interactionsToUpdate.filter(
      (interaction) =>
        !currentInteractions?.some((i) => i.name === interaction.name),
    );
    const deletedInteractions = currentInteractions?.filter(
      (interaction) =>
        !interactionsToUpdate.some((i) => i.name === interaction.name),
    );

    const updatedInteractions = interactionsToUpdate.filter((interaction) =>
      currentInteractions?.some((i) => i.name === interaction.name),
    );

    await Promise.all(
      newInteractions.map((newInteraction) =>
        this.client.application?.commands.create(newInteraction),
      ),
    );

    if (newInteractions.length > 0)
      this.client.logger.info(
        `Created ${newInteractions.length} interaction(s).`,
      );

    await Promise.all(
      deletedInteractions?.map((deletedInteraction) =>
        deletedInteraction.delete(),
      ) || [],
    );

    if (deletedInteractions && deletedInteractions.size > 0)
      this.client.logger.info(
        `Deleted ${deletedInteractions.size} interaction(s).`,
      );

    let updatedInteractionsCount = 0;

    await Promise.all(
      updatedInteractions.map(async (updatedInteraction) => {
        const previousInteraction = currentInteractions?.find(
          (i) => i.name === updatedInteraction.name,
        );

        if (!previousInteraction) return;

        const hasNameChange =
          previousInteraction.name !== updatedInteraction.name;

        const hasPermissionChange =
          previousInteraction.defaultMemberPermissions !==
          updatedInteraction.defaultMemberPermissions;

        const hasDMPermissionChange =
          previousInteraction.dmPermission !== updatedInteraction.dmPermission;

        if (hasNameChange || hasPermissionChange || hasDMPermissionChange) {
          await previousInteraction.edit(updatedInteraction);
          updatedInteractionsCount++;
        }
      }),
    );

    if (updatedInteractionsCount > 0)
      this.client.logger.info(
        `Refreshed ${updatedInteractionsCount} interaction(s).`,
      );
    else this.client.logger.info('No interaction to refresh.');

    // This is disabled because it's not working properly.

    // const rest = new REST().setToken(process.env.TOKEN);

    // try {
    //   this.client.logger.info(
    //     `Started refreshing ${this.interactions.size} application (/) commands.`,
    //   );

    //   const data = (await rest.put(
    //     Routes.applicationCommands(this.client.user!.id),
    //     {
    //       body: this.interactions
    //         .filter((interaction) => interaction.enabled)
    //         .map((interaction) => interaction.command),
    //     },
    //   )) as any[];

    //   this.client.logger.info(
    //     `Successfully reloaded ${data.length} application (/) commands.`,
    //   );
    // } catch (error) {
    //   this.client.logger.error(
    //     `Failed to reload application (/) commands: ${error}`,
    //   );
    // }
  }

  /**
   * Runs the interaction.
   *
   * @param interaction - The interaction.
   *
   * @returns {Promise<void>} - Returns nothing.
   */
  public async run(interaction: CommandInteraction<CacheType>): Promise<any> {
    if (!this.client.isReady) return undefined;
    if (!interaction) return undefined;

    let guild: GuildWithSettings | undefined = undefined;

    let context = {
      i18n: L['en'],
    } as Context;

    if (interaction.inGuild() && !interaction.isAutocomplete()) {
      guild = await findOrCreate(interaction.guildId);
      if (guild) {
        context.guild = guild;
        context.i18n = L[guild.locale as keyof typeof L];
      }
    }

    let command: Interaction | undefined = undefined;

    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
      command = this.interactions.get(interaction.commandName);
      if (!this.interactions.has(interaction.commandName)) return undefined;
    }

    if (interaction.isChatInputCommand()) {
      this.client.logger.info(
        `Command ${command?.command.name} was executed in ${
          interaction.guildId || 'DM'
        }`,
      );

      try {
        await command?.run(interaction, context);
      } catch (error) {
        this.client.logger.error(
          `Failed to run interaction ${interaction.commandName}: ${error}`,
        );
      }
    }

    if (interaction.isAutocomplete()) {
      try {
        await command?.autocomplete?.(interaction);
      } catch (error) {
        this.client.logger.error(
          `Failed to run autocomplete for interaction ${command?.command.name}: ${error}`,
        );
      }
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenu = interaction as StringSelectMenuInteraction;

      const id = selectMenu.customId.split('_')[0];

      if (!this.interactions.has(id)) return undefined;

      command = this.interactions.get(id);

      if (!command) return undefined;

      try {
        await command.selectMenu?.(interaction, context);
      } catch (error) {
        this.client.logger.error(
          `Failed to run interaction ${selectMenu.customId}: ${error}`,
        );
      }
    }
  }
}
