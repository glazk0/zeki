import { EmbedBuilder } from "discord.js";

export class BaseEmbed extends EmbedBuilder {
	constructor() {
		super();

		this.data.color = 0x269488;
	}
}
