import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const guilds = pgTable("guilds", {
	id: uuid("id").primaryKey().defaultRandom(),
	guildId: varchar("guild_id").unique().notNull(),
	locale: varchar("locale").default("en").notNull(),
	lastSeen: timestamp("last_seen").notNull().defaultNow(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const guildsNews = pgTable("guilds_news", {
	id: uuid("id").primaryKey().defaultRandom(),
	guildId: varchar("guild_id")
		.unique()
		.notNull()
		.references(() => guilds.guildId, { onDelete: "cascade" }),
	channel: varchar("channel").notNull(),
});

export const guildRelations = relations(guilds, ({ one }) => ({
	news: one(guildsNews, {
		fields: [guilds.guildId],
		references: [guildsNews.guildId],
	}),
}));
