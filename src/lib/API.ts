import queryString from 'query-string';

import { PALIA_URL } from '../utils/Constants';

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

    const res = await fetch(`${PALIA_URL}/api/search?${queries}`);

    if (!res.ok) return [];

    const data = await res.json();

    return data;
  },
  getVillager: async (key: string): Promise<IVillager | null> => {
    const res = await fetch(`${PALIA_URL}/villager/${key}/api/v0.166.2.1`);

    if (!res.ok) return null;

    const { villager } = await res.json();

    return villager;
  },
  getQuest: async (key: string): Promise<IQuest | null> => {
    const res = await fetch(`${PALIA_URL}/quest/${key}/api/v0.166.2.1`);

    if (!res.ok) return null;

    const { quest } = await res.json();

    return quest;
  },
  getRecipe: async (key: string): Promise<IRecipe | null> => {
    const res = await fetch(`${PALIA_URL}/recipe/${key}/api/v0.166.2.1`);

    if (!res.ok) return null;

    const { recipe } = await res.json();

    return recipe;
  },
};
