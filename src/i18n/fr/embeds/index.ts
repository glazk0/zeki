import type { BaseTranslation } from "../../i18n-types";

const fr_embeds: BaseTranslation = {
	help: {
		title: "Commandes de {username}",
		description: "Voici une liste de toutes mes commandes. Vous pouvez également les voir lorsque vous tapez «/» dans Discord.",
	},
	about: {
		description: "{username} est un bot Discord intuitif et convivial connecté à https://paliapedia.com et a été créé par {developer}",
		statistics_name: "Statistiques",
		statistics_value: "Serveurs: {servers}\nUtilisateurs: {users}",
		debug_name: "Debug",
		debug_value: "Shards: {shards}\nShardID: {shardId}",
	},
	item: {
		category: "Categorie",
		rarity: "Rare",
		quality: "Qualité",
		cost: "Coût",
		value: "Valeur",
		sold_at: "Vendu à",
		crafted_by: "Fabriqué par",
		gathered_from: "Cueillis par",
		quest_reward_from: "Récompense de quête pour",
		attached_to: "Attaché à",
		obtained_by_reading: "Obtenu en lisant",
		reward_from: "Récompense de",
		obtained_from: "Obtenu par",
		ingredient_for_recipe: "Ingrédient pour recette",
		needed_for_quest: "Nécessaire pour la quête",
		contains_item: "Contient un item",
	},
	quest: {
		starts_with: "Démarer avec",
		requirement: "Requière",
		requirements: "Requières",
		branching_goals: "Remplissez {count} des éléments suivants",
		turn_in: "Devient",
		quest_return: "Quête retourner",
		reward: "Récompense",
		rewards: "Récompenses",
		friendship_points: "x{amount} points d’amitié avec {villager}",
		romance_points: "x{amount} points de romance avec {villager}",
		mail_message: "Courrier de {villager}",
		visit_from: "Une visite de {villager}",
	},
	recipe: {
		cost: "Coût",
		craft_time: "Temps de fabrication",
		required_ingredients: "Ingrédient nécessaire",
		produces: "Produit",
		sold_at: "Vendu à",
		vendors: "Marchants",
		gatherables: "Récupérables",
		mail: "Courrier",
		recipes: "Recettes",
	},
	villager: {
		gift_preferences: "Préférences d'emballage",
		weekly_wants: "Demandes hebdomadaire",
		relationship: "{type} level {level} - {levelName} (Requires {requiredValue})",
	},
	weekly_wants: {
		title: "Rotation des demandes hebdomadaires",
		description: "La rotation hebdomadaire des demandes pour {date} est maintenant disponible! Vous pouvez trouver la liste complète des demandes hebdomadaires sur {url}.",
	},
	miscellaneous: {
		see_more: "Voir {count} autres...",
		no_data: "Données non disponibles.",
	},
};

export default fr_embeds;
