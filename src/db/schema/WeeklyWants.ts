import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { guilds } from './Guild';

export const weeklyWants = pgTable('weekly_wants', {
  id: uuid('id').primaryKey().defaultRandom(),
  guildId: varchar('guild_id')
    .unique()
    .notNull()
    .references(() => guilds.guildId),
  channel: varchar('channel').notNull(),
  daily: boolean('daily').notNull().default(false),
  weekly: boolean('weekly').notNull().default(false),
});
