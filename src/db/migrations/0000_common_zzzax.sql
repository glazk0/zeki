CREATE TABLE IF NOT EXISTS "guilds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guild_id" varchar NOT NULL,
	"locale" varchar DEFAULT 'en' NOT NULL,
	CONSTRAINT "guilds_guild_id_unique" UNIQUE("guild_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guild_id" varchar NOT NULL,
	"channel" varchar NOT NULL,
	CONSTRAINT "news_guild_id_unique" UNIQUE("guild_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news" ADD CONSTRAINT "news_guild_id_guilds_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
