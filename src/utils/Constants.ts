import { Locale } from "discord.js";

/**
 * The http://paliapedia.com URL.
 */
export const PALIA_URL = "https://paliapedia.com";

/**
 * The http://api.paliapedia.com URL.
 */
export const PALIA_API_URL = "https://api.paliapedia.com";

/**
 * The bot invite link.
 */
export const BOT_INVITE = "https://discord.com/oauth2/authorize?client_id=1156557693402759258&permissions=274878285824&scope=bot%20applications.commands";

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
	"vi",
	"da",
	"he",
	"zh-TW",
	"ja",
	"th",
	"hi",
	"ru",
	"pl",
	"fr",
	"lt",
	"en-GB",
	"pt-BR",
	"it",
	"cs",
	"bg",
	"hr",
	"tr",
	"hu",
	"ro",
	"ar",
	"de",
	"ko",
	"el",
	"en-US",
	"no",
	"sv-SE",
	"uk",
	"zh-CN",
	"nl",
	"es-ES",
	"fi",
] as Locale[];

/**
 * Match short locales to Discord locales.
 * @type {Record<string, Locale>}
 */
export const discordLocaleMappings = {
	en: "en-US",
	es: "es-ES",
	pt: "pt-BR",
} as Record<string, Locale>;

/**
 * Lilith locales to their full name.
 * @type {Record<string, string>}
 */
export const localesMap = {
	en: "English",
	nl: "Dutch",
	es: "Español",
	fr: "Français",
	it: "Italiano",
} as Record<string, string>;
