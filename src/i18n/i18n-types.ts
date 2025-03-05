// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType & DisallowNamespaces;
export type BaseLocale = 'en';

export type Locales = 'de' | 'en' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'pt-br' | 'ru' | 'zh-hans' | 'zh-hant';

export type Translation = RootTranslation & DisallowNamespaces;

export type Translations = RootTranslation & {
	discord: NamespaceDiscordTranslation;
	embeds: NamespaceEmbedsTranslation;
	interactions: NamespaceInteractionsTranslation;
};

type RootTranslation = {
	/**
	 * e​n
	 */
	locale: string;
};

export type NamespaceDiscordTranslation = {
	settings: {
		/**
		 * s​e​t​t​i​n​g​s
		 */
		name: string;
		/**
		 * A​c​c​e​s​s​ ​a​n​d​ ​m​a​n​a​g​e​ ​y​o​u​r​ ​s​e​r​v​e​r​ ​s​e​t​t​i​n​g​s​.
		 */
		description: string;
	};
	'settings.locale': {
		/**
		 * l​o​c​a​l​e
		 */
		name: string;
		/**
		 * C​h​a​n​g​e​ ​t​h​e​ ​l​a​n​g​u​a​g​e​ ​s​e​t​t​i​n​g​s​ ​f​o​r​ ​y​o​u​r​ ​s​e​r​v​e​r​.
		 */
		description: string;
	};
	'settings.locale.value': {
		/**
		 * v​a​l​u​e
		 */
		name: string;
		/**
		 * S​p​e​c​i​f​y​ ​t​h​e​ ​p​r​e​f​e​r​r​e​d​ ​l​a​n​g​u​a​g​e​ ​f​o​r​ ​y​o​u​r​ ​s​e​r​v​e​r​.
		 */
		description: string;
	};
	'settings.news': {
		/**
		 * n​e​w​s
		 */
		name: string;
		/**
		 * C​o​n​t​r​o​l​ ​t​h​e​ ​n​e​w​s​ ​s​e​t​t​i​n​g​s​ ​f​o​r​ ​y​o​u​r​ ​s​e​r​v​e​r​.
		 */
		description: string;
	};
	'settings.news.enable': {
		/**
		 * e​n​a​b​l​e
		 */
		name: string;
		/**
		 * A​c​t​i​v​a​t​e​ ​t​h​e​ ​n​e​w​s​ ​f​e​a​t​u​r​e​ ​f​o​r​ ​y​o​u​r​ ​s​e​r​v​e​r​.
		 */
		description: string;
	};
	'settings.news.enable.channel': {
		/**
		 * c​h​a​n​n​e​l
		 */
		name: string;
		/**
		 * D​e​s​i​g​n​a​t​e​ ​t​h​e​ ​c​h​a​n​n​e​l​ ​w​h​e​r​e​ ​n​e​w​s​ ​u​p​d​a​t​e​s​ ​w​i​l​l​ ​b​e​ ​p​o​s​t​e​d​.
		 */
		description: string;
	};
	'settings.news.disable': {
		/**
		 * d​i​s​a​b​l​e
		 */
		name: string;
		/**
		 * D​e​a​c​t​i​v​a​t​e​ ​t​h​e​ ​n​e​w​s​ ​f​e​a​t​u​r​e​ ​f​o​r​ ​y​o​u​r​ ​s​e​r​v​e​r​.
		 */
		description: string;
	};
	help: {
		/**
		 * h​e​l​p
		 */
		name: string;
		/**
		 * D​i​s​p​l​a​y​ ​a​ ​c​o​m​p​r​e​h​e​n​s​i​v​e​ ​l​i​s​t​ ​o​f​ ​Z​e​k​i​'​s​ ​a​v​a​i​l​a​b​l​e​ ​c​o​m​m​a​n​d​s​.
		 */
		description: string;
	};
	about: {
		/**
		 * a​b​o​u​t
		 */
		name: string;
		/**
		 * R​e​t​r​i​e​v​e​ ​d​e​t​a​i​l​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​ ​a​b​o​u​t​ ​Z​e​k​i​.
		 */
		description: string;
	};
	quest: {
		/**
		 * q​u​e​s​t
		 */
		name: string;
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​q​u​e​s​t​s​ ​a​n​d​ ​r​e​l​a​t​e​d​ ​i​n​f​o​r​m​a​t​i​o​n​.
		 */
		description: string;
	};
	'quest.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​q​u​e​s​t​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
	villager: {
		/**
		 * v​i​l​l​a​g​e​r
		 */
		name: string;
		/**
		 * L​o​o​k​ ​u​p​ ​i​n​f​o​r​m​a​t​i​o​n​ ​a​b​o​u​t​ ​s​p​e​c​i​f​i​c​ ​v​i​l​l​a​g​e​r​s​.
		 */
		description: string;
	};
	'villager.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​v​i​l​l​a​g​e​r​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
	recipe: {
		/**
		 * r​e​c​i​p​e
		 */
		name: string;
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​c​r​a​f​t​i​n​g​ ​r​e​c​i​p​e​s​ ​a​n​d​ ​c​r​a​f​t​i​n​g​ ​d​e​t​a​i​l​s​.
		 */
		description: string;
	};
	'recipe.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​r​e​c​i​p​e​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
	'recipe.amount': {
		/**
		 * a​m​o​u​n​t
		 */
		name: string;
		/**
		 * D​e​t​e​r​m​i​n​e​ ​t​h​e​ ​q​u​a​n​t​i​t​y​ ​o​f​ ​i​t​e​m​s​ ​t​o​ ​c​r​a​f​t​.
		 */
		description: string;
	};
	item: {
		/**
		 * i​t​e​m
		 */
		name: string;
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​i​t​e​m​s​ ​a​n​d​ ​i​t​e​m​ ​d​e​t​a​i​l​s​.
		 */
		description: string;
	};
	'item.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​i​t​e​m​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
	weekly: {
		/**
		 * w​e​e​k​l​y
		 */
		name: string;
		/**
		 * R​e​t​r​i​e​v​e​ ​w​e​e​k​l​y​ ​p​r​e​f​e​r​e​n​c​e​s​ ​a​n​d​ ​w​a​n​t​s​ ​o​f​ ​v​i​l​l​a​g​e​r​s​.
		 */
		description: string;
	};
	bundle: {
		/**
		 * b​u​n​d​l​e
		 */
		name: string;
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​i​n​f​o​r​m​a​t​i​o​n​ ​a​b​o​u​t​ ​b​u​n​d​l​e​s​ ​a​n​d​ ​t​h​e​i​r​ ​c​o​n​t​e​n​t​s​.
		 */
		description: string;
	};
	'bundle.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​b​u​n​d​l​e​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
	accomplishment: {
		/**
		 * a​c​c​o​m​p​l​i​s​h​m​e​n​t
		 */
		name: string;
		/**
		 * S​e​a​r​c​h​ ​f​o​r​ ​a​c​c​o​m​p​l​i​s​h​m​e​n​t​s​ ​a​n​d​ ​a​c​h​i​e​v​e​m​e​n​t​ ​d​e​t​a​i​l​s​.
		 */
		description: string;
	};
	'accomplishment.query': {
		/**
		 * q​u​e​r​y
		 */
		name: string;
		/**
		 * W​h​a​t​ ​a​c​c​o​m​p​l​i​s​h​m​e​n​t​ ​a​r​e​ ​y​o​u​ ​l​o​o​k​i​n​g​ ​f​o​r​?
		 */
		description: string;
	};
};

export type NamespaceEmbedsTranslation = {
	help: {
		/**
		 * {​u​s​e​r​n​a​m​e​}​'​s​ ​c​o​m​m​a​n​d​s
		 * @param {unknown} username
		 */
		title: RequiredParams<'username'>;
		/**
		 * H​e​r​e​ ​i​s​ ​a​ ​l​i​s​t​ ​o​f​ ​a​l​l​ ​m​y​ ​c​o​m​m​a​n​d​s​.​ ​Y​o​u​ ​c​a​n​ ​a​l​s​o​ ​s​e​e​ ​t​h​e​m​ ​w​h​e​n​ ​y​o​u​ ​t​y​p​e​ ​`​/​`​ ​i​n​ ​D​i​s​c​o​r​d​.
		 */
		description: string;
	};
	about: {
		/**
		 * {​u​s​e​r​n​a​m​e​}​ ​i​s​ ​a​n​ ​i​n​t​u​i​t​i​v​e​ ​a​n​d​ ​u​s​e​r​-​f​r​i​e​n​d​l​y​ ​D​i​s​c​o​r​d​ ​b​o​t​ ​c​o​n​n​e​c​t​e​d​ ​t​o​ ​h​t​t​p​s​:​/​/​p​a​l​i​a​p​e​d​i​a​.​c​o​m​ ​a​n​d​ ​h​a​s​ ​b​e​e​n​ ​c​r​e​a​t​e​d​ ​b​y​ ​{​d​e​v​e​l​o​p​e​r​s​}​.
		 * @param {unknown} developers
		 * @param {unknown} username
		 */
		description: RequiredParams<'developers' | 'username'>;
		/**
		 * S​t​a​t​i​s​t​i​c​s
		 */
		statistics_name: string;
		/**
		 * S​e​r​v​e​r​s​:​ ​{​s​e​r​v​e​r​s​}​
	​U​s​e​r​s​:​ ​{​u​s​e​r​s​}
		 * @param {unknown} servers
		 * @param {unknown} users
		 */
		statistics_value: RequiredParams<'servers' | 'users'>;
		/**
		 * D​e​b​u​g
		 */
		debug_name: string;
		/**
		 * S​h​a​r​d​s​:​ ​{​s​h​a​r​d​s​}​
	​S​h​a​r​d​I​D​:​ ​{​s​h​a​r​d​I​d​}
		 * @param {unknown} shardId
		 * @param {unknown} shards
		 */
		debug_value: RequiredParams<'shardId' | 'shards'>;
	};
	item: {
		/**
		 * C​a​t​e​g​o​r​y
		 */
		category: string;
		/**
		 * R​a​r​i​t​y
		 */
		rarity: string;
		/**
		 * Q​u​a​l​i​t​y
		 */
		quality: string;
		/**
		 * C​o​s​t
		 */
		cost: string;
		/**
		 * V​a​l​u​e
		 */
		value: string;
		/**
		 * S​o​l​d​ ​a​t
		 */
		sold_at: string;
		/**
		 * C​r​a​f​t​e​d​ ​b​y
		 */
		crafted_by: string;
		/**
		 * G​a​t​h​e​r​e​d​ ​f​r​o​m
		 */
		gathered_from: string;
		/**
		 * Q​u​e​s​t​ ​r​e​w​a​r​d​ ​f​r​o​m
		 */
		quest_reward_from: string;
		/**
		 * A​t​t​a​c​h​e​d​ ​t​o
		 */
		attached_to: string;
		/**
		 * O​b​t​a​i​n​e​d​ ​b​y​ ​r​e​a​d​i​n​g
		 */
		obtained_by_reading: string;
		/**
		 * R​e​w​a​r​d​ ​f​r​o​m
		 */
		reward_from: string;
		/**
		 * O​b​t​a​i​n​e​d​ ​f​r​o​m
		 */
		obtained_from: string;
		/**
		 * I​n​g​r​e​d​i​e​n​t​ ​f​o​r​ ​r​e​c​i​p​e
		 */
		ingredient_for_recipe: string;
		/**
		 * N​e​e​d​e​d​ ​f​o​r​ ​q​u​e​s​t
		 */
		needed_for_quest: string;
		/**
		 * C​o​n​t​a​i​n​s​ ​i​t​e​m
		 */
		contains_item: string;
	};
	quest: {
		/**
		 * S​t​a​r​t​s​ ​w​i​t​h
		 */
		starts_with: string;
		/**
		 * R​e​q​u​i​r​e​m​e​n​t
		 */
		requirement: string;
		/**
		 * R​e​q​u​i​r​e​m​e​n​t​s
		 */
		requirements: string;
		/**
		 * C​o​m​p​l​e​t​e​ ​{​c​o​u​n​t​}​ ​o​f​ ​t​h​e​ ​f​o​l​l​o​w​i​n​g
		 * @param {unknown} count
		 */
		branching_goals: RequiredParams<'count'>;
		/**
		 * T​u​r​n​ ​i​n
		 */
		turn_in: string;
		/**
		 * Q​u​e​s​t​ ​r​e​t​u​r​n
		 */
		quest_return: string;
		/**
		 * R​e​w​a​r​d
		 */
		reward: string;
		/**
		 * R​e​w​a​r​d​s
		 */
		rewards: string;
		/**
		 * x​{​a​m​o​u​n​t​}​ ​F​r​i​e​n​d​s​h​i​p​ ​P​o​i​n​t​s​ ​w​i​t​h​ ​{​v​i​l​l​a​g​e​r​}
		 * @param {unknown} amount
		 * @param {unknown} villager
		 */
		friendship_points: RequiredParams<'amount' | 'villager'>;
		/**
		 * x​{​a​m​o​u​n​t​}​ ​R​o​m​a​n​c​e​ ​P​o​i​n​t​s​ ​w​i​t​h​ ​{​v​i​l​l​a​g​e​r​}
		 * @param {unknown} amount
		 * @param {unknown} villager
		 */
		romance_points: RequiredParams<'amount' | 'villager'>;
		/**
		 * {​v​i​l​l​a​g​e​r​}​'​s​ ​m​a​i​l
		 * @param {unknown} villager
		 */
		mail_message: RequiredParams<'villager'>;
		/**
		 * A​ ​v​i​s​i​t​ ​f​r​o​m​ ​{​v​i​l​l​a​g​e​r​}
		 * @param {unknown} villager
		 */
		visit_from: RequiredParams<'villager'>;
	};
	recipe: {
		/**
		 * C​o​s​t
		 */
		cost: string;
		/**
		 * C​r​a​f​t​ ​t​i​m​e
		 */
		craft_time: string;
		/**
		 * R​e​q​u​i​r​e​d​ ​i​n​g​r​e​d​i​e​n​t​s
		 */
		required_ingredients: string;
		/**
		 * P​r​o​d​u​c​e​s
		 */
		produces: string;
		/**
		 * S​o​l​d​ ​a​t
		 */
		sold_at: string;
		/**
		 * V​e​n​d​o​r​s
		 */
		vendors: string;
		/**
		 * G​a​t​h​e​r​a​b​l​e​s
		 */
		gatherables: string;
		/**
		 * M​a​i​l
		 */
		mail: string;
		/**
		 * R​e​c​i​p​e​s
		 */
		recipes: string;
	};
	villager: {
		/**
		 * G​i​f​t​ ​p​r​e​f​e​r​e​n​c​e​s
		 */
		gift_preferences: string;
		/**
		 * W​e​e​k​l​y​ ​w​a​n​t​s
		 */
		weekly_wants: string;
		/**
		 * {​t​y​p​e​}​ ​l​e​v​e​l​ ​{​l​e​v​e​l​}​ ​-​ ​{​l​e​v​e​l​N​a​m​e​}​ ​(​R​e​q​u​i​r​e​s​ ​{​r​e​q​u​i​r​e​d​V​a​l​u​e​}​)
		 * @param {unknown} level
		 * @param {unknown} levelName
		 * @param {unknown} requiredValue
		 * @param {unknown} type
		 */
		relationship: RequiredParams<'level' | 'levelName' | 'requiredValue' | 'type'>;
	};
	weekly_wants: {
		/**
		 * W​e​e​k​l​y​ ​W​a​n​t​s​ ​R​o​t​a​t​i​o​n
		 */
		title: string;
		/**
		 * T​h​e​ ​w​e​e​k​l​y​ ​w​a​n​t​s​ ​r​o​t​a​t​i​o​n​ ​f​o​r​ ​{​d​a​t​e​}​ ​i​s​ ​n​o​w​ ​a​v​a​i​l​a​b​l​e​!​ ​Y​o​u​ ​c​a​n​ ​f​i​n​d​ ​t​h​e​ ​f​u​l​l​ ​l​i​s​t​ ​o​f​ ​w​e​e​k​l​y​ ​w​a​n​t​s​ ​o​n​ ​{​u​r​l​}​.
		 * @param {unknown} date
		 * @param {unknown} url
		 */
		description: RequiredParams<'date' | 'url'>;
	};
	miscellaneous: {
		/**
		 * S​e​e​ ​{​c​o​u​n​t​}​ ​m​o​r​e​ ​.​.​.
		 * @param {unknown} count
		 */
		see_more: RequiredParams<'count'>;
		/**
		 * N​o​ ​d​a​t​a​ ​a​v​a​i​l​a​b​l​e​.
		 */
		no_data: string;
	};
};

export type NamespaceInteractionsTranslation = {
	settings: {
		news: {
			/**
			 * N​e​w​s​ ​w​i​l​l​ ​n​o​w​ ​b​e​ ​s​e​n​t​ ​i​n​ ​{​c​h​a​n​n​e​l​}​.
			 * @param {unknown} channel
			 */
			enabled: RequiredParams<'channel'>;
			/**
			 * N​e​w​s​ ​a​r​e​ ​n​o​t​ ​e​n​a​b​l​e​d​ ​f​o​r​ ​t​h​i​s​ ​s​e​r​v​e​r​.
			 */
			not_enabled: string;
			/**
			 * N​e​w​s​ ​w​i​l​l​ ​n​o​ ​l​o​n​g​e​r​ ​b​e​ ​s​e​n​t​ ​i​n​ ​{​c​h​a​n​n​e​l​}​.
			 * @param {unknown} channel
			 */
			disabled: RequiredParams<'channel'>;
		};
		locale: {
			/**
			 * T​h​e​ ​l​o​c​a​l​e​ ​h​a​s​ ​b​e​e​n​ ​s​e​t​ ​t​o​ ​{​l​o​c​a​l​e​}​.
			 * @param {unknown} locale
			 */
			success: RequiredParams<'locale'>;
		};
	};
	miscellaneous: {
		/**
		 * I​ ​d​o​n​'​t​ ​h​a​v​e​ ​t​h​e​ ​p​e​r​m​i​s​s​i​o​n​ ​t​o​ ​v​i​e​w​ ​o​r​ ​s​e​n​d​ ​m​e​s​s​a​g​e​s​ ​i​n​ ​{​c​h​a​n​n​e​l​}​.
		 * @param {unknown} channel
		 */
		no_permissions: RequiredParams<'channel'>;
		/**
		 * N​o​ ​r​e​s​u​l​t​s​ ​f​o​u​n​d​.
		 */
		no_results: string;
		/**
		 * N​o​ ​r​e​s​u​l​t​s​ ​f​o​u​n​d​ ​f​o​r​ ​"​{​q​u​e​r​y​}​"​.
		 * @param {unknown} query
		 */
		no_results_for: RequiredParams<'query'>;
	};
};

export type Namespaces = 'discord' | 'embeds' | 'interactions';

type DisallowNamespaces = {
	/**
	 * reserved for 'discord'-namespace\
	 * you need to use the `./discord/index.ts` file instead
	 */
	discord?: "[typesafe-i18n] reserved for 'discord'-namespace. You need to use the `./discord/index.ts` file instead.";

	/**
	 * reserved for 'embeds'-namespace\
	 * you need to use the `./embeds/index.ts` file instead
	 */
	embeds?: "[typesafe-i18n] reserved for 'embeds'-namespace. You need to use the `./embeds/index.ts` file instead.";

	/**
	 * reserved for 'interactions'-namespace\
	 * you need to use the `./interactions/index.ts` file instead
	 */
	interactions?: "[typesafe-i18n] reserved for 'interactions'-namespace. You need to use the `./interactions/index.ts` file instead.";
};

export type TranslationFunctions = {
	/**
	 * en
	 */
	locale: () => LocalizedString;
	discord: {
		settings: {
			/**
			 * settings
			 */
			name: () => LocalizedString;
			/**
			 * Access and manage your server settings.
			 */
			description: () => LocalizedString;
		};
		'settings.locale': {
			/**
			 * locale
			 */
			name: () => LocalizedString;
			/**
			 * Change the language settings for your server.
			 */
			description: () => LocalizedString;
		};
		'settings.locale.value': {
			/**
			 * value
			 */
			name: () => LocalizedString;
			/**
			 * Specify the preferred language for your server.
			 */
			description: () => LocalizedString;
		};
		'settings.news': {
			/**
			 * news
			 */
			name: () => LocalizedString;
			/**
			 * Control the news settings for your server.
			 */
			description: () => LocalizedString;
		};
		'settings.news.enable': {
			/**
			 * enable
			 */
			name: () => LocalizedString;
			/**
			 * Activate the news feature for your server.
			 */
			description: () => LocalizedString;
		};
		'settings.news.enable.channel': {
			/**
			 * channel
			 */
			name: () => LocalizedString;
			/**
			 * Designate the channel where news updates will be posted.
			 */
			description: () => LocalizedString;
		};
		'settings.news.disable': {
			/**
			 * disable
			 */
			name: () => LocalizedString;
			/**
			 * Deactivate the news feature for your server.
			 */
			description: () => LocalizedString;
		};
		help: {
			/**
			 * help
			 */
			name: () => LocalizedString;
			/**
			 * Display a comprehensive list of Zeki's available commands.
			 */
			description: () => LocalizedString;
		};
		about: {
			/**
			 * about
			 */
			name: () => LocalizedString;
			/**
			 * Retrieve detailed information about Zeki.
			 */
			description: () => LocalizedString;
		};
		quest: {
			/**
			 * quest
			 */
			name: () => LocalizedString;
			/**
			 * Search for quests and related information.
			 */
			description: () => LocalizedString;
		};
		'quest.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What quest are you looking for?
			 */
			description: () => LocalizedString;
		};
		villager: {
			/**
			 * villager
			 */
			name: () => LocalizedString;
			/**
			 * Look up information about specific villagers.
			 */
			description: () => LocalizedString;
		};
		'villager.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What villager are you looking for?
			 */
			description: () => LocalizedString;
		};
		recipe: {
			/**
			 * recipe
			 */
			name: () => LocalizedString;
			/**
			 * Search for crafting recipes and crafting details.
			 */
			description: () => LocalizedString;
		};
		'recipe.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What recipe are you looking for?
			 */
			description: () => LocalizedString;
		};
		'recipe.amount': {
			/**
			 * amount
			 */
			name: () => LocalizedString;
			/**
			 * Determine the quantity of items to craft.
			 */
			description: () => LocalizedString;
		};
		item: {
			/**
			 * item
			 */
			name: () => LocalizedString;
			/**
			 * Search for items and item details.
			 */
			description: () => LocalizedString;
		};
		'item.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What item are you looking for?
			 */
			description: () => LocalizedString;
		};
		weekly: {
			/**
			 * weekly
			 */
			name: () => LocalizedString;
			/**
			 * Retrieve weekly preferences and wants of villagers.
			 */
			description: () => LocalizedString;
		};
		bundle: {
			/**
			 * bundle
			 */
			name: () => LocalizedString;
			/**
			 * Search for information about bundles and their contents.
			 */
			description: () => LocalizedString;
		};
		'bundle.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What bundle are you looking for?
			 */
			description: () => LocalizedString;
		};
		accomplishment: {
			/**
			 * accomplishment
			 */
			name: () => LocalizedString;
			/**
			 * Search for accomplishments and achievement details.
			 */
			description: () => LocalizedString;
		};
		'accomplishment.query': {
			/**
			 * query
			 */
			name: () => LocalizedString;
			/**
			 * What accomplishment are you looking for?
			 */
			description: () => LocalizedString;
		};
	};
	embeds: {
		help: {
			/**
			 * {username}'s commands
			 */
			title: (arg: { username: unknown }) => LocalizedString;
			/**
			 * Here is a list of all my commands. You can also see them when you type `/` in Discord.
			 */
			description: () => LocalizedString;
		};
		about: {
			/**
			 * {username} is an intuitive and user-friendly Discord bot connected to https://paliapedia.com and has been created by {developers}.
			 */
			description: (arg: { developers: unknown; username: unknown }) => LocalizedString;
			/**
			 * Statistics
			 */
			statistics_name: () => LocalizedString;
			/**
			 * Servers: {servers}
		Users: {users}
			 */
			statistics_value: (arg: { servers: unknown; users: unknown }) => LocalizedString;
			/**
			 * Debug
			 */
			debug_name: () => LocalizedString;
			/**
			 * Shards: {shards}
		ShardID: {shardId}
			 */
			debug_value: (arg: { shardId: unknown; shards: unknown }) => LocalizedString;
		};
		item: {
			/**
			 * Category
			 */
			category: () => LocalizedString;
			/**
			 * Rarity
			 */
			rarity: () => LocalizedString;
			/**
			 * Quality
			 */
			quality: () => LocalizedString;
			/**
			 * Cost
			 */
			cost: () => LocalizedString;
			/**
			 * Value
			 */
			value: () => LocalizedString;
			/**
			 * Sold at
			 */
			sold_at: () => LocalizedString;
			/**
			 * Crafted by
			 */
			crafted_by: () => LocalizedString;
			/**
			 * Gathered from
			 */
			gathered_from: () => LocalizedString;
			/**
			 * Quest reward from
			 */
			quest_reward_from: () => LocalizedString;
			/**
			 * Attached to
			 */
			attached_to: () => LocalizedString;
			/**
			 * Obtained by reading
			 */
			obtained_by_reading: () => LocalizedString;
			/**
			 * Reward from
			 */
			reward_from: () => LocalizedString;
			/**
			 * Obtained from
			 */
			obtained_from: () => LocalizedString;
			/**
			 * Ingredient for recipe
			 */
			ingredient_for_recipe: () => LocalizedString;
			/**
			 * Needed for quest
			 */
			needed_for_quest: () => LocalizedString;
			/**
			 * Contains item
			 */
			contains_item: () => LocalizedString;
		};
		quest: {
			/**
			 * Starts with
			 */
			starts_with: () => LocalizedString;
			/**
			 * Requirement
			 */
			requirement: () => LocalizedString;
			/**
			 * Requirements
			 */
			requirements: () => LocalizedString;
			/**
			 * Complete {count} of the following
			 */
			branching_goals: (arg: { count: unknown }) => LocalizedString;
			/**
			 * Turn in
			 */
			turn_in: () => LocalizedString;
			/**
			 * Quest return
			 */
			quest_return: () => LocalizedString;
			/**
			 * Reward
			 */
			reward: () => LocalizedString;
			/**
			 * Rewards
			 */
			rewards: () => LocalizedString;
			/**
			 * x{amount} Friendship Points with {villager}
			 */
			friendship_points: (arg: { amount: unknown; villager: unknown }) => LocalizedString;
			/**
			 * x{amount} Romance Points with {villager}
			 */
			romance_points: (arg: { amount: unknown; villager: unknown }) => LocalizedString;
			/**
			 * {villager}'s mail
			 */
			mail_message: (arg: { villager: unknown }) => LocalizedString;
			/**
			 * A visit from {villager}
			 */
			visit_from: (arg: { villager: unknown }) => LocalizedString;
		};
		recipe: {
			/**
			 * Cost
			 */
			cost: () => LocalizedString;
			/**
			 * Craft time
			 */
			craft_time: () => LocalizedString;
			/**
			 * Required ingredients
			 */
			required_ingredients: () => LocalizedString;
			/**
			 * Produces
			 */
			produces: () => LocalizedString;
			/**
			 * Sold at
			 */
			sold_at: () => LocalizedString;
			/**
			 * Vendors
			 */
			vendors: () => LocalizedString;
			/**
			 * Gatherables
			 */
			gatherables: () => LocalizedString;
			/**
			 * Mail
			 */
			mail: () => LocalizedString;
			/**
			 * Recipes
			 */
			recipes: () => LocalizedString;
		};
		villager: {
			/**
			 * Gift preferences
			 */
			gift_preferences: () => LocalizedString;
			/**
			 * Weekly wants
			 */
			weekly_wants: () => LocalizedString;
			/**
			 * {type} level {level} - {levelName} (Requires {requiredValue})
			 */
			relationship: (arg: {
				level: unknown;
				levelName: unknown;
				requiredValue: unknown;
				type: unknown;
			}) => LocalizedString;
		};
		weekly_wants: {
			/**
			 * Weekly Wants Rotation
			 */
			title: () => LocalizedString;
			/**
			 * The weekly wants rotation for {date} is now available! You can find the full list of weekly wants on {url}.
			 */
			description: (arg: { date: unknown; url: unknown }) => LocalizedString;
		};
		miscellaneous: {
			/**
			 * See {count} more ...
			 */
			see_more: (arg: { count: unknown }) => LocalizedString;
			/**
			 * No data available.
			 */
			no_data: () => LocalizedString;
		};
	};
	interactions: {
		settings: {
			news: {
				/**
				 * News will now be sent in {channel}.
				 */
				enabled: (arg: { channel: unknown }) => LocalizedString;
				/**
				 * News are not enabled for this server.
				 */
				not_enabled: () => LocalizedString;
				/**
				 * News will no longer be sent in {channel}.
				 */
				disabled: (arg: { channel: unknown }) => LocalizedString;
			};
			locale: {
				/**
				 * The locale has been set to {locale}.
				 */
				success: (arg: { locale: unknown }) => LocalizedString;
			};
		};
		miscellaneous: {
			/**
			 * I don't have the permission to view or send messages in {channel}.
			 */
			no_permissions: (arg: { channel: unknown }) => LocalizedString;
			/**
			 * No results found.
			 */
			no_results: () => LocalizedString;
			/**
			 * No results found for "{query}".
			 */
			no_results_for: (arg: { query: unknown }) => LocalizedString;
		};
	};
};

export type Formatters = {};
