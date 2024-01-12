import 'dotenv/config';

import type { Config } from 'drizzle-kit';


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

export default {
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'pg',
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
