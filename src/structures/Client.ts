import 'reflect-metadata';

import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ClientOptions, Collection, Client as DiscordClient } from 'discord.js';
import { container } from 'tsyringe';

import { EventHandler } from '../events/EventHandler';

import { Logger, createLogger } from '../lib/Logger';
import { registerClientEvents } from '../lib/RegisterEvents';
import { redis } from '../lib/Redis';

import { clientSymbol, options } from '../utils/Constants';

import { Interaction } from './Interaction';
import { API } from '../lib/API';

export class Client extends DiscordClient {
  /**
   * The cluster client.
   * @type {ClusterClient<DiscordClient>}
   * @readonly
   */
  public readonly cluster: ClusterClient<DiscordClient>;

  /**
   * The event handler.
   * @type {EventHandler}
   * @readonly
   */
  public readonly eventHandler: EventHandler;

  /**
   * The logger class.
   * @type {typeof Logger}
   */
  public readonly logger: typeof Logger;

  /**
   * The redis cache.
   * @type {typeof redis}
   * @readonly
   */
  public readonly cache: typeof redis;

  /**
   * The API that interacts with the Palia API.
   * @type {API}
   * @readonly
   */
  public readonly api: API;

  /**
   * The client's interactions.
   * @type {Collection<string, Interaction>}
   */
  public interactions: Collection<string, Interaction>;

  /**
   * Creates a new client.
   *
   * @param options - The client options.
   */
  constructor(options: ClientOptions) {
    super({
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
      ...options,
    });

    container.register(clientSymbol, { useValue: this });

    this.cluster = new ClusterClient(this);

    this.eventHandler = new EventHandler();

    this.cache = redis;

    this.api = new API();

    this.logger = createLogger(String(this.cluster.id));
  }

  /**
   * Initializes the client.
   *
   * @returns {Promise<this>} The client.
   */
  public async init(): Promise<this> {
    await this.eventHandler.init();

    await registerClientEvents();

    await this.cache.connect();

    try {
      await super.login(process.env.TOKEN);
    } catch (err) {
      this.logger.error(err);
      process.exit(1);
    }

    return this;
  }

  /**
   * Destroys the client.
   */
  public async destroy(): Promise<void> {
    await super.destroy();
    process.exit(0);
  }

  /**
   * Sets the interactions.
   *
   * @param interactions - The interactions.
   */
  public setInteractions(interactions: Collection<string, Interaction>): void {
    this.interactions = interactions;
  }
}

/**
 * Let the ClusterManager spawn the client.
 *
 * TODO : Change this to a better way to spawn the client.
 */
(async () => {
  const bot = new Client(options);
  await bot.init();
})();
