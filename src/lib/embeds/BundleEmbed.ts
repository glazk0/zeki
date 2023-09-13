import { hyperlink } from 'discord.js';

import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';

import { PALIA_URL } from '../../utils/Constants';

export class BundleEmbed extends Embed {
  constructor(
    bundle: IBundle,
    subBundle: ISubBundlesItem | null,
    { i18n }: Context,
  ) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/bundles/128/${bundle.icon}.webp`,
    };

    this.data.title = subBundle
      ? `${subBundle.name} - ${bundle.name}`
      : bundle.name;

    this.data.url = `${PALIA_URL}/bundle/${bundle.key}`;

    this.addFields({
      name: 'Rewards',
      value: bundle.rewards
        .map((reward) => {
          if (reward.type === 'PlayerTagWriteback') {
            return `- ${reward.amount}x ${reward.tag?.key} (WIP)`;
          } else if (reward.type === 'item') {
            return `- ${reward.amount}x ${hyperlink(
              reward.item?.name || 'Unknown item',
              `${PALIA_URL}/item/${reward.item?.key}`,
            )}`;
          } else {
            return `- ${reward.amount}x ${reward.type} (WIP)`;
          }
        })
        .join('\n'),
    });

    if (subBundle) {
      this.addFields({
        name: 'Items',
        value: subBundle.requiredItems
          .map((item) => {
            return `- ${item.amount}x ${hyperlink(
              item.item?.name || 'Unknown item',
              `${PALIA_URL}/item/${item.item?.key}`,
            )} ${item.starQuality ? '⭐' : ''}`;
          })
          .join('\n'),
      });

      this.addFields({
        name: `${subBundle.name} Rewards`,
        value: subBundle.rewards
          .map((reward) => {
            if (reward.type === 'recipe') {
              return `- Recipe: ${hyperlink(
                reward.recipe?.name || 'Unknown recipe',
                `${PALIA_URL}/recipe/${reward.recipe?.key}`,
              )}`;
            }
            if (reward.type === 'Coins') {
              return `- ${reward.amount}x ${reward.currency?.name}`;
            } else if (reward.type === 'item') {
              return `- ${reward.amount}x ${hyperlink(
                reward.item?.name || 'Unknown item',
                `${PALIA_URL}/item/${reward.item?.key}`,
              )}`;
            } else {
              return `- ${reward.amount}x ${reward.type} (WIP)`;
            }
          })
          .join('\n'),
      });
    }
  }
}
