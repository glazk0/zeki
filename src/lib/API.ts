import queryString from "query-string";

import { RedisClient } from "../structures/RedisClient.js";

import { request } from "../utils/Commons.js";
import { PALIA_API_URL, paliaLocales } from "../utils/Constants.js";

import { IAccomplishment, IBundle, IEntriesItem, IItem, IQuest, IRecipe, ISearchItem, IVillager, IWeeklyWantsItem } from "../@types/generated.js";

import { baseLocale } from "../i18n/i18n-util.js";

export class API extends RedisClient {
	/**
	 * The version of the API for caching purposes.
	 * @type {string}
	 * @private
	 */
	private version: string;

	constructor() {
		super();

		this.refreshVersion();
		setInterval(() => this.refreshVersion(), 1000 * 60 * 60 * 24);
	}

	/**
	 * Search for a villager, quest or recipe.
	 *
	 * @param query - The query to search for.
	 * @param type - The type of the query.
	 *
	 * @returns {Promise<ISearchItem[] | []>} The search results.
	 */
	async search(query: string, type: "villager" | "quest" | "recipe" | "item" | "accomplishment", locale: string = baseLocale): Promise<ISearchItem[] | []> {
		const queries = queryString.stringify(
			{
				q: query,
				type: type,
				l: locale,
			},
			{
				skipNull: true,
			},
		);

		// TODO Cache on 3 chars

		const cacheKey = this.join("search", query, type, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const data = await request<ISearchItem[]>(`${PALIA_API_URL}/api/search?${queries}`);

		if (!data) return [];

		await this.client.set(cacheKey, JSON.stringify(data), { EX: 60 * 60 * 24 });

		return data;
	}

	/**
	 * Get a villager by their key.
	 *
	 * @param key - The villager's key.
	 *
	 * @returns {Promise<IVillager | null>} The villager or null if not found.
	 */
	async getVillager(key: string, locale?: string): Promise<IVillager | null> {
		const cacheKey = this.join("villager", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { villager } = await request<{
			villager: IVillager;
		}>(this.url(`villager/${key}`, locale));

		if (!villager) return null;

		await this.client.set(cacheKey, JSON.stringify(villager), { EX: 60 * 60 * 24 });

		return villager;
	}

	/**
	 * Get the weekly wants.
	 *
	 * @param key - The villager's key.
	 *
	 * @returns {Promise<IWeeklyWantsItem | IEntriesItem | null>} The weekly wants or null if not found.

	 */
	async getWeeklyWants(key?: string, locale?: string): Promise<IWeeklyWantsItem | IEntriesItem | null> {
		const data = await request<IWeeklyWantsItem>(this.url("tools/weekly-wants", locale));

		if (!data || !data.entries) return null;

		if (key) {
			const entry = data.entries.find((entry) => entry.villager.key === key);

			if (!entry) return null;

			return entry;
		}

		return data;
	}

	/**
	 * Get a quest by its key.
	 *
	 * @param key - The quest's key.
	 *
	 * @returns {Promise<IQuest | null>} The quest or null if not found.
	 */
	async getQuest(key: string, locale?: string): Promise<IQuest | null> {
		const cacheKey = this.join("quest", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { quest } = await request<{
			quest: IQuest;
		}>(this.url(`quest/${key}`, locale));

		if (!quest) return null;

		await this.client.set(cacheKey, JSON.stringify(quest), { EX: 60 * 60 * 24 });

		return quest;
	}

	/**
	 * Get a recipe by its key.
	 *
	 * @param key - The recipe's key.
	 *
	 * @returns {Promise<IRecipe | null>} The recipe or null if not found.
	 */
	async getRecipe(key: string, locale?: string): Promise<IRecipe | null> {
		const cacheKey = this.join("recipe", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { recipe } = await request<{
			recipe: IRecipe;
		}>(this.url(`recipe/${key}`, locale));

		if (!recipe) return null;

		await this.client.set(cacheKey, JSON.stringify(recipe), { EX: 60 * 60 * 24 });

		return recipe;
	}

	/**
	 * Get an item by its key.
	 *
	 * @param key - The item's key.
	 *
	 * @returns {Promise<IItem | null>} The item or null if not found.
	 */
	async getItem(key: string, locale?: string): Promise<IItem | null> {
		const cacheKey = this.join("item", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { item } = await request<{
			item: IItem;
		}>(this.url(`item/${key}`, locale));

		if (!item) return null;

		await this.client.set(cacheKey, JSON.stringify(item), { EX: 60 * 60 * 24 });

		return item;
	}

	/**
	 * Get a bundle by its key.
	 *
	 * @param key - The bundle's key.
	 *
	 * @returns {Promise<IBundle | null>} The bundle or null if not found.
	 */
	async getBundle(key: string, locale?: string): Promise<IBundle | null> {
		const cacheKey = this.join("bundle", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { bundle } = await request<{
			bundle: IBundle;
		}>(this.url(`bundle/${key}`, locale));

		if (!bundle) return null;

		await this.client.set(cacheKey, JSON.stringify(bundle), { EX: 60 * 60 * 24 });

		return bundle;
	}

	/**
	 * Get an accomplishment by its key.
	 *
	 * @param key - The accomplishment's key.
	 *
	 * @returns {Promise<IAccomplishment | null>} The accomplishment or null if not found.
	 */
	async getAccomplishment(key: string, locale?: string): Promise<IAccomplishment | null> {
		const cacheKey = this.join("accomplishment", key, locale, this.version);

		const cached = await this.client.get(cacheKey);

		if (cached) return JSON.parse(cached);

		const { accomplishment } = await request<{
			accomplishment: IAccomplishment;
		}>(this.url(`accomplishment/${key}`, locale));

		if (!accomplishment) return null;

		await this.client.set(cacheKey, JSON.stringify(accomplishment), { EX: 60 * 60 * 24 });

		return accomplishment;
	}

	// /**
	//  * Get nodes or a node.
	//  *
	//  * @param query - The query to find.
	//  * @param locale - The locale to make the search.
	//  *
	//  * @returns {Promise<INode[] | []>} The node(s) or a empty array;
	//  */
	//  async getNodes(
	//   query?: string,
	//   locale?: Locales,
	// ): Promise<INode[] | []> {
	//   const queries = queryString.stringify(
	//     {
	//       q: query,
	//       locale: locale,
	//     },
	//     {
	//       skipNull: true,
	//     },
	//   );

	//   const data = await request<INode[]>(
	//     `${PALIA_MAP_URL}/api/nodes?${queries}`,
	//   );

	//   if (!data) return [];

	//   return data;
	// }

	/**
	 * Refresh the version of the API.
	 *
	 * @returns {Promise<void>} Nothing.
	 */
	private async refreshVersion(): Promise<void> {
		const { version } = await request<{
			version: string;
		}>(`${PALIA_API_URL}/api/version`);
		this.version = version;
	}

	/**
	 * Get the URL for the API.
	 *
	 * @param path - The path to the API.
	 * @param locale - The locale to use.
	 *
	 * @returns {string} The URL.
	 */
	private url(path: string, locale?: string): string {
		if (locale && paliaLocales.includes(locale) && locale !== baseLocale) {
			return `${PALIA_API_URL}/${locale}/${path}/api/${this.version}`;
		}
		return `${PALIA_API_URL}/${path}/api/${this.version}`;
	}
}
