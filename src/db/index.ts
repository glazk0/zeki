import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as schema from "./schema/index.js";

import { GuildWithSettings } from "../@types/index.js";

const connection = postgres(process.env.DATABASE_URL);

export const db = drizzle(connection, {
	logger: true,
	schema,
});

migrate(db, { migrationsFolder: "./db/migrations" })
	.then(() => {
		console.log("Migrations ran successfully");
	})
	.catch((error) => {
		console.error("Migrations failed", error);
		process.exit(1);
	});

export const findOrCreate = async (guildId: string): Promise<GuildWithSettings | undefined> => {
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
