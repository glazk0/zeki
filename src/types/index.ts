import { InferSelectModel } from 'drizzle-orm';

import { guilds } from '../db/schema/Guild';

export type Guild = InferSelectModel<typeof guilds>;
