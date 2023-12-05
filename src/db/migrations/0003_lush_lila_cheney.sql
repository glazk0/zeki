ALTER TABLE "news" DROP CONSTRAINT "news_guild_id_guilds_guild_id_fk";
--> statement-breakpoint
ALTER TABLE "guilds" ADD COLUMN "last_seen" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "guilds" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "guilds" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news" ADD CONSTRAINT "news_guild_id_guilds_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
