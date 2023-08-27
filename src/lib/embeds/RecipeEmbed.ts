import { hyperlink } from 'discord.js';
import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';
import { secondsToDhms } from '../../utils/Commons';

import { PALIA_URL } from '../../utils/Constants';

export class RecipeEmbed extends Embed {
  constructor(recipe: IRecipe, amount: number, { i18n }: Context) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/items/128/${recipe.icon}.webp`,
    };

    this.data.title = recipe.name;
    this.data.description = recipe.description;

    this.data.url = `${PALIA_URL}/recipe/${recipe.key}`;

    if (recipe.cost) {
      this.addFields({
        name: 'Cost',
        value: `${recipe.cost.amount.toLocaleString('en-US')} ${
          recipe.cost.currency.name
        }`,
      });
      if (recipe.craftTime) {
        this.addFields({
          name: 'Craft time',
          value: secondsToDhms(recipe.craftTime * amount),
        });
      }
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
      this.addFields({
        name: 'Required ingredients',
        value: recipe.ingredients
          .map((ingredient) => {
            if (ingredient.item)
              return `- ${ingredient.quantity * amount}x ${hyperlink(
                ingredient.item.name,
                `${PALIA_URL}/item/${ingredient.item.key}`,
              )}`;
            else if (ingredient.tag) {
              return `- ${ingredient.quantity * amount}x ${
                ingredient.tag.name
              }`;
            }
          })
          .join('\n'),
      });
    }

    if (recipe.outputItem && recipe.outputQuantity) {
      this.addFields({
        name: 'Produces',
        value: `- ${recipe.outputQuantity * amount}x ${hyperlink(
          recipe.outputItem.name,
          `${PALIA_URL}/item/${recipe.outputItem.key}`,
        )}`,
      });
    }

    if (recipe.sources) {
      for (const [key, value] of Object.entries(recipe.sources)) {
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
              .join('\n'),
          });
        } else if (key === 'dialogues') {
          this.addFields({
            name: 'Vendors',
            value: (value as IDialoguesItem[])
              .map(
                (vendor) =>
                  `- ${hyperlink(
                    vendor.name,
                    `${PALIA_URL}/dialogue/${vendor.key}`,
                  )}`,
              )
              .join('\n'),
          });
        } else if (key === 'gatherables') {
          this.addFields({
            name: 'Gatherables',
            value: (value as IGatherablesItem[])
              .map(
                (gatherable) =>
                  `- ${hyperlink(
                    gatherable.name,
                    `${PALIA_URL}/gatherable/${gatherable.key}`,
                  )}`,
              )
              .join('\n'),
          });
        } else if (key === 'mailMessages') {
          this.addFields({
            name: 'Mail',
            value: (value as IMailMessagesItem[])
              .map(
                (mail) =>
                  `- ${hyperlink(
                    mail.name,
                    `${PALIA_URL}/mail-messages/${mail.key}`,
                  )}`,
              )
              .join('\n'),
          });
        } else if (key === 'recipes') {
          this.addFields({
            name: 'Recipes',
            value: (value as IRecipesItem[])
              .map(
                (recipe) =>
                  `- ${hyperlink(
                    recipe.name!,
                    `${PALIA_URL}/recipe/${recipe.key}`,
                  )}`,
              )
              .join('\n'),
          });
          // } else if (key === 'interactables') {

          // } else if (key === 'items') {

          // } else if (key === 'books') {
        }
      }
    }
  }
}
