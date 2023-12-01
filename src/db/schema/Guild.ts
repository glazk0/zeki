import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { news } from "./News.js";

export const guilds = pgTable("guilds", {
	id: uuid("id").primaryKey().defaultRandom(),
	guildId: varchar("guild_id").unique().notNull(),
	locale: varchar("locale").default("en").notNull(),
});

export const guildRelations = relations(guilds, ({ one }) => ({
	news: one(news, {
		fields: [guilds.guildId],
		references: [news.guildId],
	}),
}));
