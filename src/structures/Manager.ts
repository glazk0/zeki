import { ShardingManager } from "discord.js";

import { logger } from "../lib/Logger.js";
import { Scheduler } from "../lib/Scheduler.js";

export class Manager {
	/**
	 * The sharding manager instance.
	 */
	private manager: ShardingManager;

	/**
	 * The job scheduler instance.
	 */
	private scheduler: Scheduler;

	/**
	 * @param manager - The sharding manager.
	 */
	constructor(manager: ShardingManager, scheduler: Scheduler) {
		this.manager = manager;
		this.scheduler = scheduler;
	}

	/**
	 * Initializes the manager.
	 */
	async init(): Promise<void> {
		try {
			this.registerEvents();
			await this.manager.spawn({ timeout: -1 }).then(() => logger.info("All shards launched"));
			this.scheduler.init();
		} catch (error) {
			logger.error(`Error initializing manager: ${error}`);
			process.exit(1);
		}
	}

	/**
	 * Shuts down the manager.
	 */
	async shutdown(): Promise<void> {
		await this.manager.broadcastEval((client) => client.destroy());
	}

	private registerEvents(): void {
		this.manager.on("shardCreate", (shard) => logger.info(`Launched shard #${shard.id}`));
	}
}

process.on("unhandledRejection", ({ stack }: Error) => {
	logger.error(stack);
});
