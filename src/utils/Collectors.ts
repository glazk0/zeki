import {
	APIEmbed,
	ActionRowBuilder,
	AnySelectMenuInteraction,
	ButtonBuilder,
	ButtonStyle,
	CacheType,
	ChatInputCommandInteraction,
	ComponentType,
	Embed,
	InteractionCollector,
	InteractionResponse,
	InteractionType,
	Message,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
} from "discord.js";

import { Emoji } from "./Constants.js";

import { BaseEmbed } from "../lib/embeds/BaseEmbed.js";

const TIMEOUT = 5 * 60 * 1000;

export class Collectors {
	public static async paginate(interaction: ChatInputCommandInteraction<CacheType>, pages: BaseEmbed[]) {
		return pages.length < 26 ? this.selection(interaction, pages) : this.navigation(interaction, pages);
	}
	public static async selection(interaction: ChatInputCommandInteraction<CacheType>, pages: BaseEmbed[]): Promise<InteractionResponse<boolean> | Message<boolean>> {
		if (pages.length === 1)
			return interaction.reply({
				embeds: [pages[0]?.data],
			});

		let page = 1;

		const embeds = this.shape(pages);

		const choices = pages.map((embed, index) => ({
			label: embed.data.title ?? "Untitled",
			value: index.toString(),
		}));

		const select = (page: number) => [
			new ActionRowBuilder<StringSelectMenuBuilder>({
				components: [
					new StringSelectMenuBuilder({
						customId: "select",
						placeholder: "Select a page",
						min_values: 1,
						max_values: 1,
						options: choices.map((choice, index) => ({
							...choice,
							emoji: index === page - 1 ? Emoji.RightArrow : undefined,
							default: index === page - 1,
						})),
					}),
				],
			}),
		];

		const payload = {
			embeds: [embeds[page - 1]],
			components: [...select(page)],
		};

		const response = interaction.deferred || interaction.replied ? await interaction.editReply(payload) : await interaction.reply(payload);

		const message = await response.fetch();

		const collector = new InteractionCollector(interaction.client, {
			interactionType: InteractionType.MessageComponent,
			componentType: ComponentType.StringSelect,
			message,
			guild: interaction.guild!,
			channel: interaction.channel!,
			time: TIMEOUT,
		});

		const selectionHandler = async (selection: StringSelectMenuInteraction) => {
			await selection.deferUpdate();

			page = Number.parseInt(selection.values[0], 10) + 1;

			if (page < 1) {
				page = 1;
			} else if (page > embeds.length) {
				page = embeds.length;
			}

			await interaction.editReply({
				embeds: [embeds[page - 1]],
				components: [...select(page)],
			});
		};

		collector.on("collect", selectionHandler);

		const blank = async (): Promise<Message> =>
			interaction.editReply({
				embeds: [embeds[page - 1]],
				components: [],
			});

		collector.on("end", async () => {
			await blank();
		});
		collector.on("dispose", async () => {
			await blank();
		});

		return message;
	}
	public static async navigation(
		interaction: ChatInputCommandInteraction<CacheType>,
		pages: BaseEmbed[],
		options?: {
			source?: {
				url: string;
				emoji: Emoji | string;
				label: string;
			};
		},
	): Promise<InteractionResponse<boolean> | Message<boolean>> {
		if (!interaction.deferred) await interaction.deferReply();

		if (pages.length === 1)
			return interaction.reply({
				embeds: [pages[0].data],
			});

		let page = 1;

		const embeds = this.shape(pages);

		const navigation = (page: number) => [
			new ActionRowBuilder<ButtonBuilder>({
				components: [
					new ButtonBuilder({
						customId: "previous",
						emoji: Emoji.LeftArrow,
						style: ButtonStyle.Secondary,
						disabled: page === 1,
					}),
					new ButtonBuilder({
						customId: "next",
						emoji: Emoji.RightArrow,
						style: ButtonStyle.Secondary,
						disabled: page === embeds.length,
					}),
				],
			}),
		];

		const payload = {
			embeds: [embeds[page - 1]],
			components: [...navigation(page)],
		};

		const response = interaction.deferred || interaction.replied ? await interaction.editReply(payload) : await interaction.reply(payload);

		const message = await response.fetch();

		const collector = new InteractionCollector(interaction.client, {
			interactionType: InteractionType.MessageComponent,
			componentType: ComponentType.Button,
			message,
			guild: interaction.guild!,
			channel: interaction.channel!,
			time: TIMEOUT,
		});

		const navigationHandler = async (button: AnySelectMenuInteraction) => {
			await button.deferUpdate();

			switch (button.customId) {
				case "previous":
					if (page > 1) page -= 1;
					break;
				case "next":
					if (page <= embeds.length) page += 1;
					break;
				default:
					break;
			}

			if (page < 1) {
				page = 1;
			} else if (page > embeds.length) {
				page = embeds.length;
			}

			await interaction.editReply({
				embeds: [embeds[page - 1]],
				components: [...navigation(page)],
			});
		};

		collector.on("collect", navigationHandler);

		const blank = async (): Promise<Message> =>
			interaction.editReply({
				embeds: [embeds[page - 1]],
				components: [],
			});

		collector.on("end", async () => {
			await blank();
		});

		collector.on("dispose", async () => {
			await blank();
		});

		return message;
	}

	private static shape(pages: BaseEmbed[]): APIEmbed[] {
		return pages.map((newPage, index) => {
			const pageInd = `Page ${index + 1}/${pages.length}`;
			if (!newPage.data.description) newPage.setDescription("_ _");
			if (newPage.data.footer) {
				if (newPage instanceof Embed) {
					if (newPage.data.footer.text.indexOf("Page ") === -1) {
						newPage.setFooter({
							text: `${pageInd} • ${newPage.data.footer.text}`,
							iconURL: newPage.data.footer.icon_url,
						});
					}
				} else if (newPage.data.footer.text) {
					if (newPage.data.footer.text.indexOf("Page ") === -1) {
						newPage.data.footer.text = `${pageInd} • ${newPage.data.footer.text}`;
					}
				} else {
					newPage.data.footer.text = pageInd;
				}
			} else {
				newPage.data.footer = { text: pageInd };
			}
			return newPage.data;
		});
	}
}
