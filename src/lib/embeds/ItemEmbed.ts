import { hyperlink } from 'discord.js';
import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';

import { PALIA_URL } from '../../utils/Constants';

export class ItemEmbed extends Embed {
  constructor(item: IItem, { i18n }: Context) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/items/128/${item.icon}.webp`,
    };

    this.data.title = item.name;

    if (item.description) this.data.description = item.description;

    this.data.url = `${PALIA_URL}/item/${item.key}`;

    if (item.category)
      this.addFields({
        name: 'Category',
        value: item.category,
        inline: true,
      });

    if (item.rarity)
      this.addFields({
        name: 'Rarity',
        value: item.rarity,
        inline: true,
      });

    if (item.quality)
      this.addFields({
        name: 'Quality',
        value: item.quality,
        inline: true,
      });

    if (item.value)
      this.addFields({
        name: 'Value',
        value: `${item.value.amount} ${hyperlink(
          item.value.currency.name,
          `${PALIA_URL}/item/${item.value.currency.key}`,
        )}`,
      });

    if (item.sources) {
      for (const [key, value] of Object.entries(item.sources)) {
        if (key === 'stores') {
          this.addFields({
            name: 'Sold at',
            value: (value as IStoresItem[])
              .map(
                (quest) =>
                  `- ${hyperlink(
                    quest.name,
                    `${PALIA_URL}/store/${quest.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'recipes') {
          this.addFields({
            name: 'Crafted by',
            value: (value as IRecipesItem[])
              .map(
                (recipe) =>
                  `- ${hyperlink(
                    recipe.item?.name ?? 'Unknown',
                    `${PALIA_URL}/recipe/${recipe.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'gatherables') {
          this.addFields({
            name: 'Gathered from',
            value: (value as IGatherablesItem[])
              .map(
                (gatherable) =>
                  `- ${hyperlink(
                    gatherable.name,
                    `${PALIA_URL}/gatherable/${gatherable.key}`,
                  )} (${hyperlink(
                    gatherable.skill.name,
                    `${PALIA_URL}/skill/${gatherable.skill.key}`,
                  )})`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'dialogues') {
          this.addFields({
            name: 'Reward from',
            value: (value as IDialoguesItem[])
              .map(
                (vendor) =>
                  `- ${hyperlink(
                    vendor.name,
                    `${PALIA_URL}/dialogue/${vendor.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'mailMessages') {
          this.addFields({
            name: 'Attached to',
            value: (value as IMailMessagesItem[])
              .map(
                (mail) =>
                  `- ${hyperlink(
                    mail.name,
                    `${PALIA_URL}/mail-messages/${mail.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'books') {
          this.addFields({
            name: 'Obtained by reading',
            value: (value as IBooksItem[])
              .map(
                (book) =>
                  `- ${hyperlink(book.name, `${PALIA_URL}/item/${book.key}`)}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'quests') {
          this.addFields({
            name: 'Reward from',
            value: (value as IQuest[])
              .map(
                (quest) =>
                  `- ${hyperlink(
                    quest.name,
                    `${PALIA_URL}/quest/${quest.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'items') {
          this.addFields({
            name: 'Obtained from',
            value: (value as IItemsItem[])
              .map(
                (item) =>
                  `- ${hyperlink(
                    item.name ?? 'Unknown',
                    `${PALIA_URL}/item/${item.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else {
          this.addFields({
            name: 'WIP',
            value: (value as any[]).map((unknown) => `- ${unknown}`).join('\n'),
          });
        }
      }
    }

    if (item.sourceOf) {
      for (const [key, value] of Object.entries(item.sourceOf)) {
        if (key === 'recipes') {
          this.addFields({
            name: 'Teaches Recipe',
            value: (value as IRecipesItem[])
              .map(
                (recipe) =>
                  `- ${hyperlink(
                    recipe.item?.name ?? 'Unknown',
                    `${PALIA_URL}/recipe/${recipe.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'quests') {
          this.addFields({
            name: 'Needed for Quest',
            value: (value as IQuest[])
              .map(
                (quest) =>
                  `- ${hyperlink(
                    quest.name,
                    `${PALIA_URL}/quest/${quest.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else if (key === 'items') {
          this.addFields({
            name: 'Contains Item',
            value: (value as IItemsItem[])
              .map(
                (item) =>
                  `- ${hyperlink(
                    item.name ?? 'Unknown',
                    `${PALIA_URL}/item/${item.key}`,
                  )}`,
              )
              .splice(0, 5)
              .concat(
                `- [See ${value.length} more ...](${PALIA_URL}/item/${item.key} 'See on paliapedia.com')`,
              )
              .join('\n'),
          });
        } else {
          this.addFields({
            name: 'WIP',
            value: (value as any[]).map((unknown) => `- ${unknown}`).join('\n'),
          });
        }
      }
    }

    if (item.buyable)
      this.addFields({
        name: 'Buyable',
        value: item.buyable ? 'Yes' : 'No',
        inline: true,
      });

    if (item.craftable)
      this.addFields({
        name: 'Craftable',
        value: item.craftable ? 'Yes' : 'No',
        inline: true,
      });

    if (item.obtainable)
      this.addFields({
        name: 'Obtainable',
        value: item.obtainable ? 'Yes' : 'No',
        inline: true,
      });
  }
}
