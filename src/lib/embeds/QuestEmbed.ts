import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { PALIA_URL } from "../../utils/Constants.js";

import { IBooksItem, IDialoguesItem, IItemsItem, IMailMessagesItem, IQuest, IStepsItem } from "../../@types/generated.js";

export class QuestEmbed extends BaseEmbed {
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
        name: i18n.embeds.quest.starts_with(),
        value: Object.entries(quest.starters)
          .map(([key, value]) => {
            let valueString = "";
            if (key === "dialogues") {
              for (const dialogue of value as IDialoguesItem[]) {
                valueString += `- ${hyperlink(dialogue.name, `${PALIA_URL}/dialogue/${dialogue.key}`)}\n`;
              }
            } else if (key === "items") {
              for (const item of value as IItemsItem[]) {
                valueString += `- ${hyperlink(item.name ?? i18n.embeds.miscellaneous.no_data(), `${PALIA_URL}/item/${item.key}`)}\n`;
              }
            } else if (key === "mailMessages") {
              for (const mailMessage of value as IMailMessagesItem[]) {
                valueString += `- ${hyperlink(mailMessage?.name ?? "Unknown", `${PALIA_URL}/mail-message/${mailMessage.key}`)}\n`;
              }
            } else if (key === "books") {
              for (const book of value as IBooksItem[]) {
                valueString += `- ${hyperlink(book?.name ?? "Unknown", `${PALIA_URL}/item/${book.key}`)}\n`;
              }
            } else if (key === "quests") {
              for (const quest of value as IQuest[]) {
                valueString += `- ${hyperlink(quest.name, `${PALIA_URL}/quest/${quest.key}`)}\n`;
              }
            } else {
              for (const unknown of value as any[]) {
                valueString += `- WIP ${key}/${unknown}\n`;
              }
            }
            return valueString;
          })
          .join("\n"),
      });
    }

    if (step) {
      if (step.overrideDescription) {
        this.data.description = step.overrideDescription;
      }

      if (step.goals && step.goals.length) {
        this.addFields({
          name: step.goals.length > 1 ? i18n.embeds.quest.requirements() : i18n.embeds.quest.requirement(),
          value: step.goals
            .map((goal) => {
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
                  value += ` ${condition.amountRequired ?? 1} ${hyperlink(condition.item.name, `${PALIA_URL}/item/${condition.item.key}`)}`;
                } else if (condition.dialogue) {
                  value += ` ${hyperlink(condition.dialogue.name, `${PALIA_URL}/dialogue/${condition.dialogue.key}`)}`;
                } else if (condition.recipe) {
                  value += ` ${hyperlink(condition.recipe.name, `${PALIA_URL}/recipe/${condition.recipe.key}`)}`;
                } else if (condition.villager) {
                  value += ` ${hyperlink(condition.villager.name, `${PALIA_URL}/villager/${condition.villager.key}`)}`;
                } else if (condition.currency) {
                  value += ` ${condition.amountRequired} ${condition.currency.name}`;
                } else if (condition.playerTag) {
                  value += ` ${condition.playerTag.name}`;
                } else if (condition.itemTag) {
                  if (condition.itemTag.icon) {
                    this.setImage(`${PALIA_URL}/images/tags/30/${condition.itemTag.icon}.webp`);
                  }
                  value += ` ${hyperlink(condition.itemTag.name, `${PALIA_URL}/items/page/1?filters=tag:${condition.itemTag.key}`)}`;
                }
              }

              return value;
            })
            .join("\n"),
        });
      }

      if (step.branchingGoals && step.branchingGoals.length) {
        let branchingGoals = step.branchingGoals
          .map((goal) => {
            let value = `-`;
            goal.goals
              .map((goal) => {
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
                    value += ` ${condition.amountRequired ?? 1} ${hyperlink(condition.item.name, `${PALIA_URL}/item/${condition.item.key}`)}`;
                  } else if (condition.dialogue) {
                    value += ` ${hyperlink(condition.dialogue.name, `${PALIA_URL}/dialogue/${condition.dialogue.key}`)}`;
                  } else if (condition.recipe) {
                    value += ` ${hyperlink(condition.recipe.name, `${PALIA_URL}/recipe/${condition.recipe.key}`)}`;
                  } else if (condition.villager) {
                    value += ` ${hyperlink(condition.villager.name, `${PALIA_URL}/villager/${condition.villager.key}`)}`;
                  } else if (condition.currency) {
                    value += ` ${condition.amountRequired} ${condition.currency.name}`;
                  } else if (condition.playerTag) {
                    value += ` ${condition.playerTag.name}`;
                  } else if (condition.itemTag) {
                    if (condition.itemTag.icon) {
                      this.setImage(`${PALIA_URL}/images/tags/30/${condition.itemTag.icon}.webp`);
                    }
                    value += ` ${hyperlink(condition.itemTag.name, `${PALIA_URL}/items/page/1?filters=tag:${condition.itemTag.key}`)}`;
                  }
                }
              })
              .join("\n");

            return value;
          })
          .join("\n");

        this.addFields({
          name: i18n.embeds.quest.branching_goals({
            count: step.minBranchingGoalsRequired,
          }),
          value: branchingGoals,
        });
      }

      if (step.turnInDialogue?.dialogue) {
        this.addFields({
          name: i18n.embeds.quest.turn_in(),
          value: `- \`${step.turnInDialogue.dialogue.name}\``,
        });
      }

      if (step.overrideQuestReturnText) {
        this.addFields({
          name: i18n.embeds.quest.quest_return(),
          value: `- \`${step.overrideQuestReturnText}\``,
        });
      }

      if (step.rewards && step.rewards.length) {
        this.addFields({
          name: step.rewards.length > 1 ? i18n.embeds.quest.rewards() : i18n.embeds.quest.reward(),
          value: step.rewards
            .map((reward) => {
              if (reward.item) {
                return `- x${reward.amount} ${hyperlink(reward.item.name, `${PALIA_URL}/item/${reward.item.key}`)}`;
              } else if (reward.recipe) {
                return `- ${hyperlink(reward.recipe.name, `${PALIA_URL}/item/${reward.recipe.key}`)}`;
              } else if (reward.currency) {
                return `- x${reward.amount} ${reward.currency.name}`;
              } else if (reward.villager && reward.type === "FriendshipPoints") {
                return `- ${i18n.embeds.quest.friendship_points({
                  amount: reward.amount,
                  villager: reward.villager.name,
                })}`;
              } else if (reward.villager && reward.type === "RomancePoints") {
                return `- ${i18n.embeds.quest.romance_points({
                  amount: reward.amount,
                  villager: reward.villager.name,
                })}`;
              } else if (reward.villager && reward.type === "MailMessage") {
                if (!reward.mailMessage || typeof reward.mailMessage === "string")
                  return `- ${hyperlink(
                    i18n.embeds.quest.mail_message({
                      villager: reward.villager.name,
                    }),
                    `${PALIA_URL}/mail-message/${reward.mailMessage}`,
                  )}`;
                return `- ${hyperlink(
                  reward.mailMessage?.name ??
                  i18n.embeds.quest.mail_message({
                    villager: reward.mailMessage.name,
                  }),
                  `${PALIA_URL}/mail-message/${reward.mailMessage.key}`,
                )}`;
              } else if (reward.villager && reward.type === "Visit") {
                return `- ${i18n.embeds.quest.visit_from({
                  villager: reward.villager.name,
                })}`;
              } else if (reward.type === "PlayerTagWriteback") {
                return `- WIP: ${reward.operation} ${reward.tag?.name} to ${reward.amount}`;
              } else if (reward.type === "Quest") {
                return `- ${hyperlink(reward.quest!.name, `${PALIA_URL}/quest/${reward.quest?.key}`)}`;
              } else if (reward.type === "RemoveQuest") {
                return `- ${hyperlink(reward.quest!.name, `${PALIA_URL}/quest/${reward.quest?.key}`)}`;
              } else {
                return `- WIP: ${reward.type}`;
              }
            })
            .join("\n"),
        });
      }
    }
  }
}
