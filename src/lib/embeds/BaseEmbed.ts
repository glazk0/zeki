import { EmbedBuilder, unorderedList } from "discord.js";

export class BaseEmbed extends EmbedBuilder {
	constructor() {
		super();

		this.data.color = 0x269488;
	}

	toUnorderedList(items: any[], limit = 10) {

		const length = items.length;

		if (length > limit) {
			items = items.slice(0, limit);
			items.push(`${length - limit} remaining...`);
		}

		return unorderedList(items);
	}
}
