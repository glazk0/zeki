import { userMention } from "discord.js";

import { BaseEmbed } from "./BaseEmbed.js";

import { Context } from "../../structures/Interaction.js";

import { DEVELOPERS } from "../../utils/Constants.js";

export class AboutEmbed extends BaseEmbed {
	constructor(data: any, { i18n }: Context) {
		super();

		this.data.author = {
			name: this.client.user!.username,
			icon_url: this.client.user!.displayAvatarURL(),
		};

		this.data.thumbnail = { url: this.client.user!.displayAvatarURL() };

		this.data.description = i18n.embeds.about.description({
			username: this.client.user?.username,
			developers: DEVELOPERS.map(userMention).join(", "),
		});

		this.data.fields = [
			{
				name: i18n.embeds.about.statistics_name(),
				value: i18n.embeds.about.statistics_value({
					servers: data.guilds.toLocaleString("en-US"),
					users: data.users.toLocaleString("en-US"),
				}),
			},
			{
				name: i18n.embeds.about.debug_name(),
				value: i18n.embeds.about.debug_value({
					shards: this.client.ws.shards.size,
					shardId: this.client.shard?.ids[0],
				}),
			},
		];
	}
}
