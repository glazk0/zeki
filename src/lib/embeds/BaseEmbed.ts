import { EmbedBuilder, unorderedList } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../../structures/Client.js";

import { clientSymbol } from "../../utils/Constants.js";

export class BaseEmbed extends EmbedBuilder {
	/**
	 * The client instance
	 */
	protected client: Client;

	constructor() {
		super();

		this.client = container.resolve<Client>(clientSymbol);

		this.data.color = 0x269488;

		if (this.client.user) {
			this.data.footer = {
				text: this.client.user.username,
				icon_url: this.client.user.displayAvatarURL(),
			};
		}

		this.data.timestamp = new Date().toISOString();
	}

	/**
	 * Returns a string of unordered list items.
	 *
	 * @param items - The items to list.
	 * @param limit - The limit of items to list.
	 */
	toUnorderedList(items: any[], limit = 10) {
		const length = items.length;

		if (length > limit) {
			items = items.slice(0, limit);
			items.push(`${length - limit} remaining...`);
		}

		return unorderedList(items);
	}
}
