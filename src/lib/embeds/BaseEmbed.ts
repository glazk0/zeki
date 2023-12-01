import { EmbedBuilder } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../../structures/Client.js";

import { clientSymbol } from "../../utils/Constants.js";

export class BaseEmbed extends EmbedBuilder {
	/**
	 * The client instance.
	 */
	protected client: Client;

	constructor() {
		super();

		this.client = container.resolve<Client>(clientSymbol);

		this.data.color = 0x5d8299;
	}
}
