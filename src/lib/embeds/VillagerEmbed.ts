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

    if (relationshipLevel) {
      this.addFields({
        name: `${relationshipLevel.type} level ${relationshipLevel.level} - ${relationshipLevel.levelName} (Requires ${relationshipLevel.requiredValue})`,
        value: relationshipLevel.levelDescription,
      });
    }
  }
}
