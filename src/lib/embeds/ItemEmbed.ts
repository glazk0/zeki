import { hyperlink } from 'discord.js';
import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';

import { PALIA_URL } from '../../utils/Constants';

export class ItemEmbed extends Embed {
  constructor(item: IItem, { i18n }: Context) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/quests/128/${item.icon}.webp`,
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

    if (item.sources && Object.keys(item.sources).length) {
      this.addFields({
        name: 'Sources',
        value: Object.entries(item.sources)
          .map(([key, value]) => {
            let valueString = '';
            if (key === 'quests') {
              for (const quest of value as IQuest[]) {
                valueString += `- ${hyperlink(
                  quest.name,
                  `${PALIA_URL}/quest/${quest.key}`,
                )}\n`;
              }
            } else if (key === 'items') {
              for (const item of value as IItemsItem[]) {
                valueString += `- ${hyperlink(
                  item.name ?? 'Unknown',
                  `${PALIA_URL}/item/${item.key}`,
                )}\n`;
              }
            } else if (key === 'recipes') {
              for (const recipe of value as IRecipesItem[]) {
                valueString += `- ${hyperlink(
                  recipe.item?.name ?? 'Unknown',
                  `${PALIA_URL}/recipe/${recipe.key}`,
                )}\n`;
              }
            } else if (key === 'dialogues') {
              for (const dialogue of value as IDialoguesItem[]) {
                valueString += `- ${hyperlink(
                  dialogue.name,
                  `${PALIA_URL}/dialogue/${dialogue.key}`,
                )}\n`;
              }
            } else if (key === 'mailMessages') {
              for (const mailMessage of value as IMailMessagesItem[]) {
                valueString += `- ${hyperlink(
                  mailMessage.name,
                  `${PALIA_URL}/mail-message/${mailMessage.key}`,
                )}\n`;
              }
            } else if (key === 'books') {
              for (const book of value as IBooksItem[]) {
                valueString += `- ${hyperlink(
                  book.name,
                  `${PALIA_URL}/item/${book.key}`,
                )}\n`;
              }
            } else if (key === 'quests') {
              for (const quest of value as IQuest[]) {
                valueString += `- ${hyperlink(
                  quest.name,
                  `${PALIA_URL}/quest/${quest.key}`,
                )}\n`;
              }
            } else {
              for (const unknown of value as any[]) {
                valueString += `- WIP ${key}/${unknown}\n`;
              }
            }
            return valueString;
          })
          .splice(0, 5)
          .join('\n'),
      });
    }

    if (item.sourceOf && Object.keys(item.sourceOf).length) {
      this.addFields({
        name: 'Source Of',
        value: Object.entries(item.sourceOf)
          .map(([key, value]) => {
            let valueString = '';
            if (key === 'quests') {
              for (const quest of value as IQuest[]) {
                valueString += `- ${hyperlink(
                  quest.name,
                  `${PALIA_URL}/quest/${quest.key}`,
                )}\n`;
              }
            } else if (key === 'items') {
              for (const item of value as IItemsItem[]) {
                valueString += `- ${hyperlink(
                  item.name ?? 'Unknown',
                  `${PALIA_URL}/item/${item.key}`,
                )}\n`;
              }
            } else if (key === 'recipes') {
              for (const recipe of value as IRecipesItem[]) {
                valueString += `- ${hyperlink(
                  recipe.item?.name ?? 'Unknown',
                  `${PALIA_URL}/recipe/${recipe.key}`,
                )}\n`;
              }
            } else if (key === 'dialogues') {
              for (const dialogue of value as IDialoguesItem[]) {
                valueString += `- ${hyperlink(
                  dialogue.name,
                  `${PALIA_URL}/dialogue/${dialogue.key}`,
                )}\n`;
              }
            } else if (key === 'mailMessages') {
              for (const mailMessage of value as IMailMessagesItem[]) {
                valueString += `- ${hyperlink(
                  mailMessage.name,
                  `${PALIA_URL}/mail-message/${mailMessage.key}`,
                )}\n`;
              }
            } else if (key === 'books') {
              for (const book of value as IBooksItem[]) {
                valueString += `- ${hyperlink(
                  book.name,
                  `${PALIA_URL}/item/${book.key}`,
                )}\n`;
              }
            } else if (key === 'quests') {
              for (const quest of value as IQuest[]) {
                valueString += `- ${hyperlink(
                  quest.name,
                  `${PALIA_URL}/quest/${quest.key}`,
                )}\n`;
              }
            } else {
              for (const unknown of value as any[]) {
                valueString += `- WIP ${key}/${unknown}\n`;
              }
            }
            return valueString;
          })
          .splice(0, 5)
          .join('\n'),
      });
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
