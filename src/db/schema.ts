import { relations } from 'drizzle-orm';
import { index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const guilds = pgTable(
	'guilds',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		locale: varchar('locale').default('en').notNull(),
		lastSeen: timestamp('last_seen').notNull().defaultNow(),
		guildId: varchar('guild_id').unique().notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow()
	},
	(table) => {
		return {
			guildIdIndex: index('guilds_guild_id_index').on(table.guildId),
			lastSeenIndex: index('guilds_last_seen_index').on(table.lastSeen)
		};
	}
);

export type Guild = typeof guilds.$inferSelect;

export type GuildWithSettings = Guild & {
	news: GuildNews;
};

export const guildsNews = pgTable(
	'guilds_news',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		channel: varchar('channel').notNull(),
		guildId: varchar('guild_id')
			.unique()
			.notNull()
			.references(() => guilds.guildId, { onDelete: 'cascade' })
	},
	(table) => {
		return {
			channelIndex: index('guilds_news_channel_index').on(table.channel)
		};
	}
);

export type GuildNews = typeof guildsNews.$inferSelect;

export const guildRelations = relations(guilds, ({ one }) => ({
	news: one(guildsNews, {
		fields: [guilds.guildId],
		references: [guildsNews.guildId]
	})
}));

export const news = pgTable(
	'news',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		key: varchar('key').notNull(),
		title: varchar('title').notNull(),
		locale: varchar('locale').default('en').notNull(),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(table) => {
		return {
			keyIndex: index('news_key_index').on(table.key),
			localeIndex: index('news_locale_index').on(table.locale)
		};
	}
);

export const logs = pgTable(
	'logs',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		command: varchar('command').notNull(),
		guildId: varchar('guild_id').references(() => guilds.guildId, { onDelete: 'set null' }),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(table) => {
		return {
			guildIdIndex: index('logs_guild_id_index').on(table.guildId)
		};
	}
);
