import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connection = postgres(process.env.DATABASE_URL as string, { max: 1 });

export const db = drizzle(connection, { logger: true });
