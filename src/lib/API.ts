import queryString from 'query-string';

import { PALIA_URL } from '../utils/Constants';
import { request } from '../utils/Commons';

export const api = {
  search: async (
    query: string,
    type: 'villager' | 'quest' | 'recipe' = 'villager',
  ): Promise<ISearchItem[]> => {
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
  },
  getVillager: async (key: string): Promise<IVillager | null> => {
    const { villager } = await request<any>(
      `${PALIA_URL}/villager/${key}/api/v0.166.2.1`,
    );

    if (!villager) return null;

    return villager;
  },
  getQuest: async (key: string): Promise<IQuest | null> => {
    const { quest } = await request<any>(
      `${PALIA_URL}/quest/${key}/api/v0.166.2.1`,
    );

    if (!quest) return null;

    return quest;
  },
  getRecipe: async (key: string): Promise<IRecipe | null> => {
    const { recipe } = await request<any>(
      `${PALIA_URL}/recipe/${key}/api/v0.166.2.1`,
    );

    if (!recipe) return null;

    return recipe;
  },
};
