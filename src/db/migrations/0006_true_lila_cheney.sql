CREATE TABLE IF NOT EXISTS "logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"command" varchar NOT NULL,
	"guild_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "last_seen_index";--> statement-breakpoint
DROP INDEX IF EXISTS "channel_index";--> statement-breakpoint
DROP INDEX IF EXISTS "key_index";--> statement-breakpoint
DROP INDEX IF EXISTS "locale_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "logs_guild_id_index" ON "logs" ("guild_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guilds_guild_id_index" ON "guilds" ("guild_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guilds_last_seen_index" ON "guilds" ("last_seen");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "guilds_news_channel_index" ON "guilds_news" ("channel");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_key_index" ON "news" ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_locale_index" ON "news" ("locale");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "logs" ADD CONSTRAINT "logs_guild_id_guilds_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
