import { createClient } from "redis";

export const redis = createClient({
	socket: {
		host: process.env.REDIS_HOST || "redis",
		port: process.env.REDIS_PORT || 6379,
	},
	password: process.env.REDIS_PASSWORD,
});
