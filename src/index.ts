import "dotenv/config";
import "reflect-metadata";

import { ShardingManager } from "discord.js";

import { Manager } from "./structures/Manager.js";

import { Jobs } from "./lib/Jobs.js";
import { logger } from "./lib/Logger.js";
import { Retention } from "./lib/jobs/Retention.js";

import { getFilePath } from "./utils/File.js";

const shardManager = new ShardingManager(getFilePath("Bot.js"), {
	totalShards: "auto",
	mode: "process",
	token: process.env.TOKEN,
});

const jobs = new Jobs([
	new Retention(),
	// new News(),
	// new WeeklyWants(shardManager)
]);

const manager = new Manager(shardManager, jobs);

try {
	manager.init();
} catch (error) {
	logger.error(error);
}

process.on("SIGINT", () => {
	logger.info("SIGINT signal received.");
	manager.shutdown();
	process.exit(0);
});
