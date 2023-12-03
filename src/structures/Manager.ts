import { ShardingManager } from "discord.js";

import { logger } from "../lib/Logger.js";
import { Jobs } from "../lib/Jobs.js";

export class Manager {
	/**
	 * The sharding manager instance.
	 */
	private manager: ShardingManager;

	/**
	 * The jobs service.
	 */
	private jobs: Jobs;

	/**
	 * @param manager - The sharding manager.
	 */
	constructor(manager: ShardingManager, jobs: Jobs) {
		this.manager = manager;
		this.jobs = jobs;
	}

	/**
	 * Initializes the manager.
	 */
	async init(): Promise<void> {
		this.registerEvents();
		await this.manager
			.spawn({
				timeout: -1,
			})
			.then(() => logger.info("All shards launched"));
		this.jobs.init();
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
