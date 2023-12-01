import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { guilds } from "./Guild.js";

export const news = pgTable("news", {
	id: uuid("id").primaryKey().defaultRandom(),
	guildId: varchar("guild_id")
		.unique()
		.notNull()
		.references(() => guilds.guildId),
	channel: varchar("channel").notNull(),
});
