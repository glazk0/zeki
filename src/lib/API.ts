import queryString from 'query-string';

import { PALIA_URL } from '../utils/Constants';
import { request } from '../utils/Commons';

export class API {
  /**
   * The version of the API for caching purposes.
   * @type {string}
   * @private
   */
  private version: string;

  constructor() {
    // Get the version of the API and refresh it every 5 minutes.
    this.refreshVersion();
    setInterval(() => this.refreshVersion(), 5 * 60 * 1000);
  }

  /**
   * Search for a villager, quest or recipe.
   *
   * @param query - The query to search for.
   * @param type - The type of the query.
   *
   * @returns {Promise<ISearchItem[]>} The search results.
   */
  public async search(
    query: string,
    type: 'villager' | 'quest' | 'recipe' = 'villager',
  ): Promise<ISearchItem[]> {
    const queries = queryString.stringify(
      {
        q: query,
        type: type,
      },
      {
        skipNull: true,
      },
    );

    const data = await request<ISearchItem[]>(
      `${PALIA_URL}/api/search?${queries}`,
    );

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
  public async getVillager(key: string): Promise<IVillager | null> {
    const { villager } = await request<{
      villager: IVillager;
    }>(`${PALIA_URL}/villager/${key}/api/${this.version}`);

    if (!villager) return null;

    return villager;
  }

  /**
   * Get a quest by its key.
   *
   * @param key - The quest's key.
   *
   * @returns {Promise<IQuest | null>} The quest or null if not found.
   */
  public async getQuest(key: string): Promise<IQuest | null> {
    const { quest } = await request<{
      quest: IQuest;
    }>(`${PALIA_URL}/quest/${key}/api/${this.version}`);

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
  public async getRecipe(key: string): Promise<IRecipe | null> {
    const { recipe } = await request<{
      recipe: IRecipe;
    }>(`${PALIA_URL}/recipe/${key}/api/${this.version}`);

    if (!recipe) return null;

    return recipe;
  }

  /**
   * Refresh the version of the API.
   */
  private async refreshVersion(): Promise<void> {
    const { version } = await request<{
      version: string;
    }>(`${PALIA_URL}/api/version`);

    this.version = version;
  }
}
