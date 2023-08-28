import { hyperlink } from 'discord.js';
import { Embed } from '../../lib/embeds/Embed';

import { Context } from '../../structures/Interaction';

import { PALIA_URL } from '../../utils/Constants';

export class QuestEmbed extends Embed {
  constructor(quest: IQuest, step: IStepsItem | null, { i18n }: Context) {
    super();

    this.data.thumbnail = {
      url: `${PALIA_URL}/images/quests/128/${quest.icon}.webp`,
    };

    this.data.title = quest.name;
    this.data.description = quest.description;

    this.data.url = `${PALIA_URL}/quest/${quest.key}`;

    if (quest.starters && Object.keys(quest.starters).length) {
      this.addFields({
        name: 'Starts with',
        value: Object.entries(quest.starters)
          .map(([key, value]) => {
            let valueString = '';
            if (key === 'dialogues') {
              for (const dialogue of value as IDialoguesItem[]) {
                valueString += `- ${hyperlink(
                  dialogue.name,
                  `${PALIA_URL}/dialogue/${dialogue.key}`,
                )}\n`;
              }
            } else if (key === 'items') {
              for (const item of value as IItemsItem[]) {
                valueString += `- ${hyperlink(
                  item.name ?? 'Unknown',
                  `${PALIA_URL}/item/${item.key}`,
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
            } else {
              for (const unknown of value as any[]) {
                valueString += `- WIP ${key}/${unknown}\n`;
              }
            }
            return valueString;
          })
          .join('\n'),
      });
    }

    if (step) {
      if (step.overrideDescription) {
        this.data.description = step.overrideDescription;
      }

      if (step.goals && step.goals.length) {
        this.addFields({
          name: step.goals.length > 1 ? 'Requirements' : 'Requirement',
          value: step.goals
            .map((goal: any) => {
              let value = `-`;

              if (goal.description) {
                value += ` \`${goal.description}\``;
              }

              if (goal.condition) {
                const condition = goal.condition;

                if (!condition.subConditions && condition.type) {
                  value += ` ${condition.type}`;
                }

                if (condition.quest) {
                  value += ` ${condition.quest.name}`;
                } else if (condition.item) {
                  value += ` ${condition.amountRequired ?? 1} ${hyperlink(
                    condition.item.name,
                    `${PALIA_URL}/item/${condition.item.key}`,
                  )}`;
                } else if (condition.dialogue) {
                  value += ` ${hyperlink(
                    condition.dialogue.name,
                    `${PALIA_URL}/dialogue/${condition.dialogue.key}`,
                  )}`;
                } else if (condition.recipe) {
                  value += ` ${hyperlink(
                    condition.recipe.name,
                    `${PALIA_URL}/recipe/${condition.recipe.key}`,
                  )}`;
                } else if (condition.villager) {
                  value += ` ${hyperlink(
                    condition.villager.name,
                    `${PALIA_URL}/villager/${condition.villager.key}`,
                  )}`;
                } else if (condition.currency) {
                  value += ` ${condition.amountRequired} ${condition.currency.name}`;
                } else if (condition.playerTag) {
                  value += ` ${condition.playerTag.name}`;
                } else if (condition.itemTag) {
                  if (condition.itemTag.icon) {
                    this.setImage(
                      `${PALIA_URL}/images/tags/30/${condition.itemTag.icon}.webp`,
                    );
                  }
                  value += ` ${hyperlink(
                    condition.itemTag.name,
                    `${PALIA_URL}/items/page/1?filters=tag:${condition.itemTag.key}`,
                  )}`;
                } else if (condition.subConditions) {
                  if (condition.type === 'or') {
                    value += `Complete any of the following:\n`;
                  } else if (condition.type === 'and') {
                    value += `Complete all of the following:\n`;
                  }
                  for (const subCondition of condition.subConditions) {
                    value += `- ${subCondition.type} ${subCondition.amount} ${subCondition.item.name}\n`;
                  }
                }
              }

              return value;
            })
            .join('\n'),
        });
      }

      if (step.turnInDialogue?.dialogue) {
        this.addFields({
          name: 'Turn In',
          value: `- \`${step.turnInDialogue.dialogue.name}\``,
        });
      }

      if (step.overrideQuestReturnText) {
        this.addFields({
          name: 'Quest Return',
          value: `- \`${step.overrideQuestReturnText}\``,
        });
      }

      if (step.rewards && step.rewards.length) {
        this.addFields({
          name: step.rewards.length > 1 ? 'Rewards' : 'Reward',
          value: step.rewards
            .map((reward) => {
              if (reward.item) {
                return `- x${reward.amount} ${hyperlink(
                  reward.item.name,
                  `${PALIA_URL}/item/${reward.item.key}`,
                )}`;
              } else if (reward.recipe) {
                return `- ${hyperlink(
                  reward.recipe.name,
                  `${PALIA_URL}/item/${reward.recipe.key}`,
                )}`;
              } else if (reward.currency) {
                return `- x${reward.amount} ${reward.currency.name}`;
              } else if (
                reward.villager &&
                reward.type === 'FriendshipPoints'
              ) {
                return `- ${reward.amount} Friendship Points with ${reward.villager.name}`;
              } else if (reward.villager && reward.type === 'RomancePoints') {
                return `- ${reward.amount} Romance Points with ${reward.villager.name}`;
              } else if (reward.villager && reward.type === 'MailMessage') {
                return `- ${hyperlink(
                  reward.mailMessage?.name ??
                    `${reward.mailMessage?.name}'s mail`,
                  `${PALIA_URL}/mail-message/${reward.mailMessage?.key}`,
                )}`;
              } else if (reward.villager && reward.type === 'Visit') {
                return `- A visit from ${reward.villager.name}`;
              } else if (reward.type === 'PlayerTagWriteback') {
                return `- WIP: ${reward.operation} ${reward.tag?.name} to ${reward.amount}`;
              } else if (reward.type === 'Quest') {
                return `- ${hyperlink(
                  reward.quest!.name,
                  `${PALIA_URL}/quest/${reward.quest?.key}`,
                )}`;
              } else if (reward.type === 'RemoveQuest') {
                return `- ${hyperlink(
                  reward.quest!.name,
                  `${PALIA_URL}/quest/${reward.quest?.key}`,
                )}`;
              } else {
                return `- WIP: ${reward.type}`;
              }
            })
            .join('\n'),
        });
      }
    }
  }
}
