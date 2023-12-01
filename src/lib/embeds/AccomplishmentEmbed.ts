import { hyperlink } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { PALIA_URL } from "../../utils/Constants.js";

import { IAccomplishment } from "../../@types/generated.js";

export class AccomplishmentEmbed extends BaseEmbed {
	constructor(accomplishment: IAccomplishment, { i18n }: Context) {
		super();

		this.data.thumbnail = {
			url: `${PALIA_URL}/images/accomplishments/128/${accomplishment.icon}.webp`,
		};

		this.data.title = accomplishment.name;

		if (accomplishment.description) this.data.description = accomplishment.description;

		this.data.url = `${PALIA_URL}/accomplishment/${accomplishment.key}`;

		if (accomplishment.rewards && accomplishment.rewards.length) {
			this.addFields({
				name: accomplishment.rewards.length > 1 ? "Rewards" : "Reward",
				value: accomplishment.rewards
					.map((reward) => {
						if (reward.item) {
							return `- x${reward.amount} ${hyperlink(reward.item.name, `${PALIA_URL}/item/${reward.item.key}`)}`;
						} else if (reward.recipe) {
							return `- ${hyperlink(reward.recipe.name, `${PALIA_URL}/item/${reward.recipe.key}`)}`;
						} else if (reward.currency) {
							return `- x${reward.amount} ${reward.currency.name}`;
						} else if (reward.villager && reward.type === "FriendshipPoints") {
							return `- ${reward.amount} Friendship Points with ${reward.villager.name}`;
						} else if (reward.villager && reward.type === "RomancePoints") {
							return `- ${reward.amount} Romance Points with ${reward.villager.name}`;
						} else if (reward.villager && reward.type === "MailMessage") {
							if (!reward.mailMessage || typeof reward.mailMessage === "string") return `- ${hyperlink(`${reward.villager.name}'s mail`, `${PALIA_URL}/mail-message/${reward.mailMessage}`)}`;

							return `- ${hyperlink(reward.mailMessage?.name ?? `${reward.mailMessage?.name}'s mail`, `${PALIA_URL}/mail-message/${reward.mailMessage?.key}`)}`;
						} else if (reward.villager && reward.type === "Visit") {
							return `- A visit from ${reward.villager.name}`;
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

		if (accomplishment.requirement?.quest) {
			this.addFields({
				name: "Quest",
				value: hyperlink(accomplishment.requirement.quest.name, `${PALIA_URL}/quest/${accomplishment.requirement.quest.key}`),
			});
		}

		// if (accomplishment.requirement?.items?.length) {
		//   this.addFields({
		//     name: 'Requirements',
		//     value: accomplishment.requirement.items
		//       .map((item) => {
		//         if (typeof item.item === 'string' || !item.item)
		//           return `${item.amount} ${item ? item : 'Unknown'}`;

		//         return `${item.amount} ${hyperlink(
		//           item.item.name,
		//           `${PALIA_URL}/item/${item.item.key}`,
		//         )}`;
		//       })
		//       .splice(0, 5)
		//       .concat(
		//         `- [See ${
		//           accomplishment.requirement?.items?.length - 5
		//         } more ...](${PALIA_URL}/accomplishment/${
		//           accomplishment.key
		//         } 'See on paliapedia.com')`,
		//       )
		//       .join('\n'),
		//   });
		// }
	}
}
