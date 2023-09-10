import { InferSelectModel } from 'drizzle-orm';

import { news, guilds, weeklyWants } from '../db/schema';

export type Guild = InferSelectModel<typeof guilds>;
export type News = InferSelectModel<typeof news>;
export type WeeklyWants = InferSelectModel<typeof weeklyWants>;

export type GuildWithSettings = Guild & {
  news: News;
  weeklyWants: WeeklyWants;
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

export interface IWeeklyWants {
  version: number;
  currentTime: number;
  nextMonday: number;
  entries: IWeeklyWantsEntry[];
}

export interface IWeeklyWantsEntry {
  villager: IVillager;
  weeklyWants: IWeeklyGiftPreferencesItem[];
}

export interface ITimeObject {
  hour: number;
  minute: number;
}

export interface IPeriod {
  start: ITimeObject;
  end: ITimeObject;
}
