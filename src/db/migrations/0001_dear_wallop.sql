CREATE TABLE IF NOT EXISTS "weekly_wants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guild_id" varchar NOT NULL,
	"channel" varchar NOT NULL,
	"daily" boolean DEFAULT false NOT NULL,
	"weekly" boolean DEFAULT false NOT NULL,
	CONSTRAINT "weekly_wants_guild_id_unique" UNIQUE("guild_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weekly_wants" ADD CONSTRAINT "weekly_wants_guild_id_guilds_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
