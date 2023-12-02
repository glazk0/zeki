import "dotenv/config";
import "reflect-metadata";

import { ShardingManager } from "discord.js";

import { Logger } from "./lib/Logger.js";

import { getFilePath } from "./utils/File.js";

const manager = new ShardingManager(getFilePath("Bot.js"), {
	totalShards: "auto",
	mode: "process",
	token: process.env.TOKEN,
});

manager
	.spawn({
		timeout: -1,
	})
	.catch((reason) => Logger.error(reason));

process.on("SIGINT", () => {
	Logger.info("SIGINT signal received.");
	manager.broadcastEval((client) => client.destroy());
	process.exit(0);
});
