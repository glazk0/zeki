import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const news = pgTable(
	"news",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		key: varchar("key").notNull(),
		title: varchar("title").notNull(),
		locale: varchar("locale").default("en").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			keyIndex: index("key_index").on(table.key),
			localeIndex: index("locale_index").on(table.locale),
		};
	},
);
