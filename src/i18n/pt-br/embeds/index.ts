import type { NamespaceEmbedsTranslation } from "../../i18n-types";

const pt_br_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: "Comandos de {username}",
		description: "Aqui está uma lista de todos os meus comandos. Você também pode vê-los quando digita `/` no Discord.",
	},
	about: {
		description: "{username} é um bot do Discord intuitivo e fácil de usar, conectado a https://paliapedia.com e foi criado por {developers}.",
		statistics_name: "Estatísticas",
		statistics_value: "Servidores: {servers}\nUsuários: {users}",
		debug_name: "Depuração",
		debug_value: "Shards: {shards}\nShardID: {shardId}",
	},
	item: {
		category: "Categoria",
		rarity: "Raridade",
		quality: "Qualidade",
		cost: "Custo",
		value: "Valor",
		sold_at: "Vendido em",
		crafted_by: "Criado por",
		gathered_from: "Coletado de",
		quest_reward_from: "Recompensa de missão",
		attached_to: "Anexado a",
		obtained_by_reading: "Obtido ao ler",
		reward_from: "Recompensa de",
		obtained_from: "Obtido de",
		ingredient_for_recipe: "Ingrediente para receita",
		needed_for_quest: "Necessário para a missão",
		contains_item: "Contém item",
	},
	quest: {
		starts_with: "Começa com",
		requirement: "Requisito",
		requirements: "Requisitos",
		branching_goals: "Complete {count} dos seguintes",
		turn_in: "Entregar",
		quest_return: "Retorno da missão",
		reward: "Recompensa",
		rewards: "Recompensas",
		friendship_points: "x{amount} Pontos de Amizade com {villager}",
		romance_points: "x{amount} Pontos de Romance com {villager}",
		mail_message: "Mensagem de {villager}",
		visit_from: "Uma visita de {villager}",
	},
	recipe: {
		cost: "Custo",
		craft_time: "Tempo de criação",
		required_ingredients: "Ingredientes necessários",
		produces: "Produz",
		sold_at: "Vendido em",
		vendors: "Vendedores",
		gatherables: "Itens coletáveis",
		mail: "Correio",
		recipes: "Receitas",
	},
	villager: {
		gift_preferences: "Preferências de presente",
		weekly_wants: "Desejos semanais",
		relationship: "Nível {level} de {type} - {levelName} (Requer {requiredValue})",
	},
	weekly_wants: {
		title: "Rotação de Desejos Semanais",
		description: "A rotação de desejos semanais para {date} já está disponível! Você pode encontrar a lista completa de desejos semanais em {url}.",
	},
	miscellaneous: {
		see_more: "Ver mais {count}...",
		no_data: "Nenhum dado disponível.",
	},
};

export default pt_br_embeds;
