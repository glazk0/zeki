import queryString from "query-string";

import { request } from "../utils/Commons.js";
import { PALIA_API_URL } from "../utils/Constants.js";

import { IAccomplishment, IAccomplishmentItem, IBundle, IEntriesItem, IItem, IQuest, IRecipe, ISearchItem, IVillager, IWeeklyWantsItem } from "../@types/generated.js";

export class API {
	/**
	 * The version of the API for caching purposes.
	 * @type {string}
	 * @private
	 */
	private version: string;

	constructor() {
		setInterval(
			() => {
				this.refreshVersion();
			},
			1000 * 60 * 60 * 24,
		);
	}

	/**
	 * Search for a villager, quest or recipe.
	 *
	 * @param query - The query to search for.
	 * @param type - The type of the query.
	 *
	 * @returns {Promise<ISearchItem[] | []>} The search results.
	 */
	async search(query: string, type: "villager" | "quest" | "recipe" | "item" | "accomplishment"): Promise<ISearchItem[] | []> {
		const queries = queryString.stringify(
			{
				q: query,
				type: type,
			},
			{
				skipNull: true,
			},
		);

		const data = await request<ISearchItem[]>(`${PALIA_API_URL}/api/search?${queries}`);

		if (!data) return [];

		return data;
	}

	/**
	 * Get a villager by their key.
	 *
	 * @param key - The villager's key.
	 *
	 * @returns {Promise<IVillager | null>} The villager or null if not found.
	 */
	async getVillager(key: string): Promise<IVillager | null> {
		const { villager } = await request<{
			villager: IVillager;
		}>(`${PALIA_API_URL}/villager/${key}/api/${this.version}`);

		if (!villager) return null;

		return villager;
	}

	/**
	 * Get the weekly wants.
	 *
	 * @param key - The villager's key.
	 *
	 * @returns {Promise<IWeeklyWantsItem | IEntriesItem | null>} The weekly wants or null if not found.

	 */
	async getWeeklyWants(key?: string): Promise<IWeeklyWantsItem | IEntriesItem | null> {
		const data = await request<IWeeklyWantsItem>(`${PALIA_API_URL}/tools/weekly-wants/api/${this.version}`);

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
	async getQuest(key: string): Promise<IQuest | null> {
		const { quest } = await request<{
			quest: IQuest;
		}>(`${PALIA_API_URL}/quest/${key}/api/${this.version}`);

		if (!quest) return null;

		return quest;
	}

	/**
	 * Get a recipe by its key.
	 *
	 * @param key - The recipe's key.
	 *
	 * @returns {Promise<IRecipe | null>} The recipe or null if not found.
	 */
	async getRecipe(key: string): Promise<IRecipe | null> {
		const { recipe } = await request<{
			recipe: IRecipe;
		}>(`${PALIA_API_URL}/recipe/${key}/api/${this.version}`);

		if (!recipe) return null;

		return recipe;
	}

	/**
	 * Get an item by its key.
	 *
	 * @param key - The item's key.
	 *
	 * @returns {Promise<IItem | null>} The item or null if not found.
	 */
	async getItem(key: string): Promise<IItem | null> {
		const { item } = await request<{
			item: IItem;
		}>(`${PALIA_API_URL}/item/${key}/api/${this.version}`);

		if (!item) return null;

		return item;
	}

	/**
	 * Get a bundle by its key.
	 *
	 * @param key - The bundle's key.
	 *
	 * @returns {Promise<IBundle | null>} The bundle or null if not found.
	 */
	async getBundle(key: string): Promise<IBundle | null> {
		const { bundle } = await request<{
			bundle: IBundle;
		}>(`${PALIA_API_URL}/bundle/${key}/api/${this.version}`);

		if (!bundle) return null;

		return bundle;
	}

	/**
	 * Get an accomplishment by its key.
	 *
	 * @param key - The accomplishment's key.
	 *
	 * @returns {Promise<IAccomplishment | null>} The accomplishment or null if not found.
	 */
	async getAccomplishment(key: string): Promise<IAccomplishment | null> {
		const { accomplishment } = await request<IAccomplishmentItem>(`${PALIA_API_URL}/accomplishment/${key}/api/${this.version}`);

		if (!accomplishment) return null;

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
}
