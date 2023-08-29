import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from './schema';
import { GuildWithNews } from '../types';

const connection = postgres(process.env.DATABASE_URL as string, { max: 1 });

export const db = drizzle(connection, {
  logger: true,
  schema,
});

export const findOrCreate = async (
  guildId: string,
): Promise<GuildWithNews | undefined> => {
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
