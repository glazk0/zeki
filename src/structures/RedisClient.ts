import { RedisClientType, createClient } from "redis";

import { logger } from "../lib/Logger.js";

export abstract class RedisClient {
	/**
	 * The redis client instance.
	 */
	public client: RedisClientType;

	constructor() {
		this.client = createClient({
			socket: {
				host: process.env.REDIS_HOST || "redis",
				port: process.env.REDIS_PORT || 6379,
			},
			password: process.env.REDIS_PASSWORD,
		});
		this.registerEvents();
	}

	/**
	 * @returns The redis client.
	 */
	async connect(): Promise<RedisClientType> {
		return this.client.connect();
	}

	/**
	 * Disconnects the redis client.
	 */
	async disconnect(): Promise<void> {
		return this.client.disconnect();
	}

	/**
	 * Joins the keys together.
	 *
	 * @param keys - The keys to join.
	 *
	 * @returns The joined keys.
	 */
	join(...keys: (string | undefined)[]): string {
		return keys.filter((key) => key).join(":");
	}

	private registerEvents(): void {
		this.client.on("error", (error) => logger.error(error));
	}
}
