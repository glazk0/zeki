import type { NamespaceEmbedsTranslation } from "../../i18n-types";

const de_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: "Die Befehle von {username}",
		description: "Hier ist eine Liste aller meiner Befehle. Wenn Ihr mehr Informationen über einen Befehl benötigt, verwendet `/help <command>`.",
	},
	about: {
		description:
			'{username} ist ein intuitiver und benutzerfreundlicher Discord-Bot, der mit https://paliapedia.com verbunden ist und von {developers} erstellt wurde',
		statistics_name: 'Statistik',
		statistics_value: 'Servers: {servers}\nUsers: {users}',
		debug_name: "Debug",
		debug_value: "Shards: {shards}\nShardID: {shardId}",
	},
	item: {
		category: 'Kategorie',
		rarity: 'Seltenheit',
		quality: 'Qualität',
		cost: 'Kosten',
		value: 'Wert',
		sold_at: 'Verkauft von',
		crafted_by: 'Hergestellt von',
		gathered_from: 'Gesammelt von',
		quest_reward_from: 'Questbelohnung von',
		attached_to: 'Angehängt an',
		obtained_by_reading: 'Durch Lesen erlangt',
		reward_from: 'Belohnung von',
		obtained_from: 'erlangt von',
		teaches_recipe: 'Lehrt Rezept',
		needed_for_quest: 'Benötigt für Quest',
		contains_item: 'Enthält Gegenstand',
	},
	quest: {
		starts_with: 'Beginnt mit',
		requirement: 'Anforderung',
		requirements: 'Anforderungen',
		branching_goals: 'Vervollständige die folgenden Punkte {count}',
		turn_in: 'Abgabe',
		quest_return: 'Questabgabe',
		reward: 'Belohnung',
		rewards: 'Belohnungen',
		friendship_points: 'x{amount} Freundschaftspunkte mit {villager}',
		romance_points: 'x{amount} Romantikpunkte mit {villager}',
		mail_message: "{villager}'s mail",
		visit_from: 'Ein Besuch von {villager}',
	},
	recipe: {
		cost: 'Kosten',
		craft_time: 'Handwerkszeit',
		required_ingredients: 'Erforderliche Zutaten',
		produces: 'Produziert',
		sold_at: 'Verkauft von ',
		vendors: 'Verkäufer',
		gatherables: 'Sammelbares',
		mail: 'Mail',
		recipes: 'Rezepte',
	},
	villager: {
		gift_preferences: 'Geschenkevorlieben',
		weekly_wants: 'Wöchentliche Wünsche',
		relationship:
			'{type} level {level} - {levelName} (erfordert {requiredValue})',
	},
	weekly_wants: {
		title: 'Wöchentliche Wünsche',
		description:
			'Die Wochenwünsche vom {date} sind jetzt verfügbar! Die vollständige Liste der Wochenwünsche findest du hier {url}.',
	},
	miscellaneous: {
		see_more: 'Siehe {count} mehr ...',
		no_data: 'Keine Daten verfügbar.',
	},
};

export default de_embeds;
