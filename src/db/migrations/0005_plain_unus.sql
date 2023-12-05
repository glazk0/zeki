CREATE TABLE IF NOT EXISTS "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"title" varchar NOT NULL,
	"locale" varchar DEFAULT 'en' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "key_index" ON "news" ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "locale_index" ON "news" ("locale");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "last_seen_index" ON "guilds" ("last_seen");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "channel_index" ON "guilds_news" ("channel");
