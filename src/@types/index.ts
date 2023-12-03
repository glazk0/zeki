import { InferSelectModel } from "drizzle-orm";

import { guildsNews, guilds } from "../db/schema";

export type Guild = InferSelectModel<typeof guilds>;
export type News = InferSelectModel<typeof guildsNews>;

export type GuildWithSettings = Guild & {
	news: News;
};

export interface INews {
	key?: string;
	title?: string;
	locale?: string;
	date?: string;
	type?: string;
	image?: string;
	url?: string;
}

export interface ITimeObject {
	hour: number;
	minute: number;
}

export interface IPeriod {
	start: ITimeObject;
	end: ITimeObject;
}
