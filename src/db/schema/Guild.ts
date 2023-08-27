import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

import { db } from '..';
import { Guild } from '../../types';

export const guilds = pgTable('guilds', {
  id: uuid('id').primaryKey().defaultRandom(),
  guildId: varchar('guild_id').unique().notNull(),
  locale: varchar('locale').default('en').notNull(),
});

// make a findOrCreate method
export const findOrCreate = async (guildId: string): Promise<Guild> => {
  let [guild] = await db
    .select()
    .from(guilds)
    .where(eq(guilds.guildId, guildId))
    .limit(1);

  if (!guild) {
    [guild] = await db.insert(guilds).values({ guildId }).returning();
  }

  return guild;
};
