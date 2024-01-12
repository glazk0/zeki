import { Locale } from "discord.js";

import L from "./i18n-node.js";
import { locales } from "./i18n-util.js";

import { discordLocaleMappings, discordLocales } from "../utils/Constants.js";

interface Command {
	name: string;
	description: string;
	name_localizations: { [locale: string]: string };
	description_localizations: { [locale: string]: string };
}

interface CommandLocalization {
	name: string;
	description: string;
}

interface AllCommands {
	[locale: string]: { [key: string]: CommandLocalization };
}

export const commands: { [key: string]: Command } = {};

const allCommands: AllCommands = {};

locales
	.filter((locale) => discordLocales.includes(locale as Locale) || discordLocaleMappings[locale])
	.map((locale) => {
		const commands = Object.entries(L[locale].discord).reduce((command, [key, value]) => {
			command[key] = {
				name: value.name(),
				description: value.description(),
			};
			return command;
		}, {} as { [key: string]: CommandLocalization });

		const localeKey = discordLocales.includes(locale as Locale) ? (locale as Locale) : discordLocaleMappings[locale];

		if (localeKey) allCommands[localeKey] = commands;
	});

if (locales.includes("en")) {
	const enCommands = allCommands["en-US"];

	Object.entries(enCommands!).forEach(([key, { name, description }]) => {
		const command: Command = {
			name,
			description,
			name_localizations: {
				"en-US": name,
			},
			description_localizations: {
				"en-US": description,
			},
		};

		locales
			.filter((locale) => locale !== "en")
			.forEach((locale) => {
				const localeKey = discordLocales.includes(locale as Locale) ? (locale as Locale) : discordLocaleMappings[locale];

				if (localeKey) {
					const l7d = allCommands[localeKey]?.[key];
					if (l7d) {
						command.name_localizations[localeKey] = l7d.name;
						command.description_localizations[localeKey] = l7d.description;
					}
				}
			});

		commands[key] = command;
	});
}
