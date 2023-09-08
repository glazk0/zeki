import { hyperlink } from 'discord.js';
import { Embed } from './Embed';

import { IWeeklyWantsEntry } from '../../types';
import { PALIA_URL } from '../../utils/Constants';

export class WeeklyWantsEmbed extends Embed {
  constructor(weeklyWants: IWeeklyWantsEntry) {
    super();

    this.data.title = weeklyWants.villager.name;

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/villagers/128/${weeklyWants.villager.icon}.webp`,
    };

    this.data.url = `${PALIA_URL}/villager/${weeklyWants.villager.key}`;

    const weeklyWantsByRewardLevel = weeklyWants.weeklyWants.reduce(
      (acc, weeklyWant) => {
        const rewardLevel = weeklyWant.rewardLevel;

        if (!acc[rewardLevel]) {
          acc[rewardLevel] = [];
        }

        acc[rewardLevel].push(weeklyWant);

        return acc;
      },
      {} as Record<string, IWeeklyWantsEntry['weeklyWants']>,
    );

    for (const rewardLevel in weeklyWantsByRewardLevel) {
      const weeklyWants = weeklyWantsByRewardLevel[rewardLevel];
      this.addFields({
        name: rewardLevel,
        value: weeklyWants
          .map((weeklyWant) => {
            return `- ${hyperlink(
              weeklyWant.item.name,
              `https://palia.com/item/${weeklyWant.item.key}`,
            )}`;
          })
          .join('\n'),
      });
    }
  }
}
