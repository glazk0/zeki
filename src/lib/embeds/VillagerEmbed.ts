import { hyperlink } from 'discord.js';

import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';

import { PALIA_URL } from '../../utils/Constants';

export class VillagerEmbed extends Embed {
  constructor(
    villager: IVillager,
    relationshipLevel: IRelationshipLevelsItem | null,
    { i18n }: Context,
  ) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/villagers/128/${villager.icon}.webp`,
    };

    this.data.title = villager.name;
    this.data.description = villager.description;

    this.data.url = `${PALIA_URL}/villager/${villager.key}`;

    if (villager.giftPreferences && villager.giftPreferences.length) {
      this.addFields({
        name: 'Gift Preferences',
        value: villager.giftPreferences
          .map((gift: any) => {
            if (!gift.item) return;
            return `- ${gift.rewardLevel} ${hyperlink(
              gift.item.name,
              `${PALIA_URL}/item/${gift.item.key}`,
            )}`;
          })
          .splice(0, 5)
          .concat(
            `- [See ${
              villager.giftPreferences.length - 5
            } more ...](${PALIA_URL}/villager/${
              villager.key
            } 'See on paliapedia.com')`,
          )
          .join('\n'),
      });
    }

    const weeklyWantsByRewardLevel = villager.weeklyGiftPreferences?.reduce(
      (acc, weeklyWant) => {
        const rewardLevel = weeklyWant.rewardLevel;

        if (!acc[rewardLevel]) {
          acc[rewardLevel] = [];
        }

        acc[rewardLevel]?.push(weeklyWant);

        return acc;
      },
      {} as Record<string, IVillager['weeklyGiftPreferences']>,
    );

    if (
      weeklyWantsByRewardLevel &&
      Object.keys(weeklyWantsByRewardLevel).length
    )
      for (const rewardLevel in weeklyWantsByRewardLevel) {
        const weeklyWants = weeklyWantsByRewardLevel[rewardLevel];

        if (!weeklyWants || !weeklyWants.length) continue;

        this.addFields({
          name: rewardLevel,
          value: weeklyWants
            .map((weeklyWant) => {
              return `- ${hyperlink(
                weeklyWant.item.name,
                `${PALIA_URL}/item/${weeklyWant.item.key}`,
              )}`;
            })
            .join('\n'),
        });
      }

    if (relationshipLevel) {
      this.addFields({
        name: `${relationshipLevel.type} level ${relationshipLevel.level} - ${relationshipLevel.levelName} (Requires ${relationshipLevel.requiredValue})`,
        value:
          relationshipLevel.levelDescription ?? 'No description available.',
      });
    }
  }
}
