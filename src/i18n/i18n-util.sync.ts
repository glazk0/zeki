// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters.js';
import type { Locales, Translations } from './i18n-types.js';
import { loadedFormatters, loadedLocales, locales } from './i18n-util.js';

import de from './de/index.js';
import en from './en/index.js';
import es from './es/index.js';
import fr from './fr/index.js';
import it from './it/index.js';
import ja from './ja/index.js';
import ko from './ko/index.js';
import pt_br from './pt-br/index.js';
import ru from './ru/index.js';
import zh_hans from './zh-hans/index.js';
import zh_hant from './zh-hant/index.js';

import de_discord from './de/discord/index.js';
import de_embeds from './de/embeds/index.js';
import de_interactions from './de/interactions/index.js';
import en_discord from './en/discord/index.js';
import en_embeds from './en/embeds/index.js';
import en_interactions from './en/interactions/index.js';
import es_discord from './es/discord/index.js';
import es_embeds from './es/embeds/index.js';
import es_interactions from './es/interactions/index.js';
import fr_discord from './fr/discord/index.js';
import fr_embeds from './fr/embeds/index.js';
import fr_interactions from './fr/interactions/index.js';
import it_discord from './it/discord/index.js';
import it_embeds from './it/embeds/index.js';
import it_interactions from './it/interactions/index.js';
import ja_discord from './ja/discord/index.js';
import ja_embeds from './ja/embeds/index.js';
import ja_interactions from './ja/interactions/index.js';
import ko_discord from './ko/discord/index.js';
import ko_embeds from './ko/embeds/index.js';
import ko_interactions from './ko/interactions/index.js';
import pt_br_discord from './pt-br/discord/index.js';
import pt_br_embeds from './pt-br/embeds/index.js';
import pt_br_interactions from './pt-br/interactions/index.js';
import ru_discord from './ru/discord/index.js';
import ru_embeds from './ru/embeds/index.js';
import ru_interactions from './ru/interactions/index.js';
import zh_hans_discord from './zh-hans/discord/index.js';
import zh_hans_embeds from './zh-hans/embeds/index.js';
import zh_hans_interactions from './zh-hans/interactions/index.js';
import zh_hant_discord from './zh-hant/discord/index.js';
import zh_hant_embeds from './zh-hant/embeds/index.js';
import zh_hant_interactions from './zh-hant/interactions/index.js';

const localeTranslations = {
	de: {
		...de,
		discord: de_discord,
		embeds: de_embeds,
		interactions: de_interactions
	},
	en: {
		...en,
		discord: en_discord,
		embeds: en_embeds,
		interactions: en_interactions
	},
	es: {
		...es,
		discord: es_discord,
		embeds: es_embeds,
		interactions: es_interactions
	},
	fr: {
		...fr,
		discord: fr_discord,
		embeds: fr_embeds,
		interactions: fr_interactions
	},
	it: {
		...it,
		discord: it_discord,
		embeds: it_embeds,
		interactions: it_interactions
	},
	ja: {
		...ja,
		discord: ja_discord,
		embeds: ja_embeds,
		interactions: ja_interactions
	},
	ko: {
		...ko,
		discord: ko_discord,
		embeds: ko_embeds,
		interactions: ko_interactions
	},
	'pt-br': {
		...pt_br,
		discord: pt_br_discord,
		embeds: pt_br_embeds,
		interactions: pt_br_interactions
	},
	ru: {
		...ru,
		discord: ru_discord,
		embeds: ru_embeds,
		interactions: ru_interactions
	},
	'zh-hans': {
		...zh_hans,
		discord: zh_hans_discord,
		embeds: zh_hans_embeds,
		interactions: zh_hans_interactions
	},
	'zh-hant': {
		...zh_hant,
		discord: zh_hant_discord,
		embeds: zh_hant_embeds,
		interactions: zh_hant_interactions
	}
};

export const loadLocale = (locale: Locales): void => {
	if (loadedLocales[locale]) return;

	loadedLocales[locale] = localeTranslations[locale] as unknown as Translations;
	loadFormatters(locale);
};

export const loadAllLocales = (): void => locales.forEach(loadLocale);

export const loadFormatters = (locale: Locales): void => void (loadedFormatters[locale] = initFormatters(locale));
