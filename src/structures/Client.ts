import 'reflect-metadata';

import { ClientOptions, Collection, Client as DiscordClient, REST, Routes } from 'discord.js';
import { Logger } from 'pino';
import { container } from 'tsyringe';

import { Event } from './Event.js';
import { Interaction } from './Interaction.js';

import { API } from '../lib/API.js';
import { createLogger } from '../lib/Logger.js';

import { getFilePaths, importFile } from '../utils/File.js';

export class Client extends DiscordClient {
	/**
	 * The logger instance for the shard.
	 */
	readonly logger: Logger;

	/**
	 * The API that interacts with the Palia API.
	 */
	readonly api: API;

	/**
	 * The client's interactions mapped by their name.
	 */
	readonly interactions: Collection<string, Interaction>;

	/**
	 * @param options - The client options.
	 */
	constructor(options: ClientOptions) {
		super(options);

		this.logger = createLogger(this.shard?.ids[0].toString());

		this.api = new API();

		this.interactions = new Collection();
	}

	/**
	 * Initializes the client.
	 *
	 * @returns {Promise<this>} The client.
	 */
	async init(): Promise<void> {
		try {
			await this.api.connect();
			await this.registerInteractions();
			await this.registerEvents();
			await this.login(process.env.TOKEN);
			await this.registerCommands();
		} catch (error) {
			this.logger.error(error);
			process.exit(1);
		}
	}

	private async registerInteractions(): Promise<void> {
		const filePaths = getFilePaths('interactions/**/*.js');

		for (const filePath of filePaths) {
			const file = await importFile(filePath);
			const interaction = container.resolve<Interaction>(file);

			if (!interaction.enabled) continue;

			this.logger.info(`Loaded interaction ${interaction.command.name} from ${interaction.category} category`);

			this.interactions.set(interaction.command.name, interaction);
		}
	}

	private async registerEvents(): Promise<void> {
		const filePaths = getFilePaths('events/**/*.js');

		for (const filePath of filePaths) {
			const file = await importFile(filePath);
			const event = container.resolve<Event>(file);

			this.logger.info(`Loaded event ${event.id}`);

			if (event.once) this.once(event.event, (...args) => event.run(...args));
			else this.on(event.event, (...args) => event.run(...args));
		}
	}

	private async registerCommands(): Promise<void> {
		const rest = new REST().setToken(process.env.TOKEN);

		try {
			this.logger.info(`Started refreshing ${this.interactions.size} application (/) commands`);

			const body = this.interactions.map((interaction) => interaction.command);

			await rest.put(Routes.applicationCommands(this.application?.id as string), {
				body
			});

			this.logger.info(`Successfully reloaded ${this.interactions.size} application (/) commands`);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
