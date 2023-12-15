import { InviteGenerationOptions, Locale, OAuth2Scopes, PermissionFlagsBits } from "discord.js";

import { Locales } from "../i18n/i18n-types.js";

/**
 * The http://paliapedia.com URL.
 */
export const PALIA_URL = "https://paliapedia.com";

/**
 * The http://api.paliapedia.com URL.
 */
export const PALIA_API_URL = "https://api.paliapedia.com";

/**
 * The bot invite link with slash commands only.
 */
export const BOT_PERMISSIONS: InviteGenerationOptions = {
	scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
	permissions: [
		PermissionFlagsBits.SendMessages,
		PermissionFlagsBits.SendMessagesInThreads,
		PermissionFlagsBits.EmbedLinks,
		PermissionFlagsBits.AttachFiles,
		PermissionFlagsBits.UseExternalEmojis,
		PermissionFlagsBits.UseExternalStickers,
		PermissionFlagsBits.AddReactions,
	],
};

/**
 * The support server invite link.
 */
export const SUPPORT_SERVER = "https://discord.gg/rGEk2Dv7qe";

/**
 * Utility array of the developer IDs.
 */
export const DEVELOPERS = [
	// glazk0
	"247344130798256130",
];

/**
 * The client symbol for the container.
 */
export const clientSymbol = Symbol("client");

/**
 * The api symbol for the container.
 */
export const apiSymbol = Symbol("api");

/**
 * List of Discord locales.
 */
export const discordLocales = [
	"id", // Indonesian
	"da", // Danish
	"de", // German
	"en-GB", // English, UK
	"en-US", // English, US
	"es-ES", // Spanish
	"fr", // French
	"hr", // Croatian
	"it", // Italian
	"lt", // Lithuanian
	"hu", // Hungarian
	"nl", // Dutch
	"no", // Norwegian
	"pl", // Polish
	"pt-BR", // Portuguese, Brazilian
	"ro", // Romanian, Romania
	"fi", // Finnish
	"sv-SE", // Swedish
	"vi", // Vietnamese
	"tr", // Turkish
	"cs", // Czech
	"el", // Greek
	"bg", // Bulgarian
	"ru", // Russian
	"uk", // Ukrainian
	"hi", // Hindi
	"th", // Thai
	"zh-CN", // Chinese, China
	"ja", // Japanese
	"zh-TW", // Chinese, Taiwan
	"ko", // Korean
] as Locale[];

/**
 * Match short locales to Discord locales.
 */
export const discordLocaleMappings = {
	en: "en-US",
	es: "es-ES",
	pt: "pt-BR",
	zh: "zh-CN",
} as Record<string, Locale>;

/**
 * List of Paliapedia locales.
 */
export const paliaLocales = [
	"en", // English
	"de", // German
	"es", // Spanish
	"fr", // French
	"it", // Italian
	"ru", // Russian
];

/**
 * Zeki locales to their full name.
 */
export const localesMap: Record<Locales, string> = {
	en: "English", // Supported by Paliapedia
	de: "Deutsch", // Supported by Paliapedia
	// es: "Español", // Supported by Paliapedia
	fr: "Français", // Supported by Paliapedia
	it: "Italiano", // Supported by Paliapedia
	ru: "Русский", // Supported by Paliapedia
};
