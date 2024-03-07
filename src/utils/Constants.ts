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
	"zh-hans": "zh-CN",
	"zh-hant": "zh-CN",
	"pt-br": "pt-BR",
	"es-es": "es-ES",
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
	"ru", // Russian,
	"ja", // Japanese
	"ko", // Korean
	"pt-br", // Portuguese, Brazilian
	"zh-hans", // Chinese, Simplified
	"zh-hant", // Chinese, Traditional
];

export const discordToPalia = {
	"en-GB": "en",
	"en-US": "en",
	"es-ES": "es",
	"pt-BR": "pt-br",
	ja: "ja",
	ko: "ko",
	de: "de",
	fr: "fr",
	it: "it",
	ru: "ru",
	"zh-CN": "zh-hans",
	"zh-TW": "zh-hant",
} as Record<Locale, Locales>;

/**
 * Zeki locales to their full name.
 */
export const localesMap: Record<Locales, string> = {
	en: "English", // Supported by Paliapedia
	de: "Deutsch", // Supported by Paliapedia
	es: "Español", // Supported by Paliapedia
	fr: "Français", // Supported by Paliapedia
	it: "Italiano", // Supported by Paliapedia
	ru: "Русский", // Supported by Paliapedia,
	ja: "日本語", // Supported by Paliapedia
	ko: "한국어", // Supported by Paliapedia
	"pt-br": "Português Brasileiro", // Supported by Paliapedia
	"zh-hans": "简体中文", // Supported by Paliapedia
	"zh-hant": "繁體中文", // Supported by Paliapedia
};

/**
 * List of emojis.
 */
export enum Emoji {
	RightArrow = "➡",
	LeftArrow = "⬅",
}
