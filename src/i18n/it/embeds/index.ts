import type { NamespaceEmbedsTranslation } from "../../i18n-types";

const it_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: "{username}'s commands",
		description: "Qui c'è la lista di tutti miei comandi. Puoi anche visualizzarli digitando `/` in Discord.",
	},
	about: {
		description:
			'{username} è un Discord bot intuitivo e facile da usare, connesso a https://paliapedia.com ed è stato creato da {developers}.',
		statistics_name: 'Statistica',
		statistics_value: 'Server: {servers}\nUtenti: {users}',
		debug_name: "Debug",
		debug_value: "Shards: {shards}\nShardID: {shardId}",
	},
	item: {
		category: 'Categoria',
		rarity: 'Rarità',
		quality: 'Qualità',
		cost: 'Costo',
		value: 'Prezzo',
		sold_at: 'Venduto da',
		crafted_by: 'Confezzionato a',
		gathered_from: 'Raccolto da',
		quest_reward_from: 'Ricompensa di quest',
		attached_to: 'Attaccato a',
		obtained_by_reading: 'Ottenuto leggendo',
		reward_from: 'Ricompensa da',
		obtained_from: 'Ottenuto da',
		teaches_recipe: 'Ingrediente di ricetta',
		needed_for_quest: 'Necessario per il quest',
		contains_item: 'Contiene oggetto',
	},
	quest: {
		starts_with: 'Parte da',
		requirement: 'Requisito',
		requirements: 'Requisiti',
		branching_goals: 'Completa i {count} seguenti',
		turn_in: 'Consegna a',
		quest_return: 'Ritorna a',
		reward: 'Ricompensa',
		rewards: 'Ricompense',
		friendship_points: 'x{amount} Punti Amicizia con {villager}',
		romance_points: 'x{amount} Punti Relazione con {villager}',
		mail_message: "Messaggio da {villager}",
		visit_from: 'Visita di {villager}',
	},
	recipe: {
		cost: 'Costo',
		craft_time: 'Tempo di creazione',
		required_ingredients: 'Ingredienti richiesti',
		produces: 'Produce',
		sold_at: 'Venduto da',
		vendors: 'Venditori',
		gatherables: 'Raccoglibili',
		mail: 'Posta',
		recipes: 'Ricette',
	},
	villager: {
		gift_preferences: 'Regali preferiti',
		weekly_wants: 'Regali settimanali',
		relationship:
			'{type} livello {level} - {levelName} (Necessita {requiredValue})',
	},
	weekly_wants: {
		title: 'Rotazione dei regali settimanali',
		description:
			"La lista dei regali settimanali ricercati a {date} è ora disponibile! Puoi trovare l'elenco completo al {url}.",
	},
	miscellaneous: {
		see_more: 'Vedi ancora {count} ...',
		no_data: 'Dati inesistenti.',
	},
};

export default it_embeds;
