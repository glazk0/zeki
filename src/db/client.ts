import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// TODO - Actually need to remove .js from imports

import * as schema from "./schema.js";

import { logger } from "../lib/Logger.js";

import { getFilePath } from "../utils/File.js";

const connection = postgres(process.env.DATABASE_URL);

export const db = drizzle(connection, {
	schema,
});

migrate(db, { migrationsFolder: getFilePath("db/migrations") })
	.then(() => {
		logger.info("Migrations ran successfully");
	})
	.catch((error) => {
		logger.error(`Error running migrations: ${error}`);
		process.exit(1);
	});

export const findOrCreate = async (guildId: string): Promise<schema.GuildWithSettings | undefined> => {
	let guild = await db.query.guilds.findFirst({
		with: {
			news: true,
		},
		where(guild, { eq }) {
			return eq(guild.guildId, guildId);
		},
	});

	if (!guild) {
		guild = await db.transaction(async (tx) => {
			await tx.insert(schema.guilds).values({
				guildId,
			});

			return tx.query.guilds.findFirst({
				with: {
					news: true,
				},
				where(guild, { eq }) {
					return eq(guild.guildId, guildId);
				},
			});
		});
	}

	return guild;
};
