ALTER TABLE "news" RENAME TO "guilds_news";--> statement-breakpoint
ALTER TABLE "guilds_news" DROP CONSTRAINT "news_guild_id_unique";--> statement-breakpoint
ALTER TABLE "guilds_news" DROP CONSTRAINT "news_guild_id_guilds_guild_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guilds_news" ADD CONSTRAINT "guilds_news_guild_id_guilds_guild_id_fk" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "guilds_news" ADD CONSTRAINT "guilds_news_guild_id_unique" UNIQUE("guild_id");