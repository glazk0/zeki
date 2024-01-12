import type { NamespaceEmbedsTranslation } from "../../i18n-types";

const ja_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: "コマンド: {username}",
		description: "こちらは私のすべてのコマンドのリストです。Discordで `/` を入力すると見ることもできます。",
	},
	about: {
		description: "{username} は https://paliapedia.com に接続された直感的で使いやすいDiscordボットで、{developers} によって作成されました。",
		statistics_name: "統計",
		statistics_value: "サーバー数: {servers}\nユーザー数: {users}",
		debug_name: "デバッグ",
		debug_value: "シャード: {shards}\nシャードID: {shardId}",
	},
	item: {
		category: "カテゴリ",
		rarity: "希少度",
		quality: "品質",
		cost: "コスト",
		value: "価値",
		sold_at: "販売場所",
		crafted_by: "製作者",
		gathered_from: "入手元",
		quest_reward_from: "クエスト報酬",
		attached_to: "添付",
		obtained_by_reading: "読んで入手",
		reward_from: "報酬",
		obtained_from: "入手元",
		ingredient_for_recipe: "レシピの材料",
		needed_for_quest: "クエストに必要",
		contains_item: "アイテムを含む",
	},
	quest: {
		starts_with: "始まり",
		requirement: "要件",
		requirements: "要件",
		branching_goals: "以下を {count} 個完了",
		turn_in: "提出",
		quest_return: "クエストの戻り",
		reward: "報酬",
		rewards: "報酬",
		friendship_points: "{villager} との友情ポイント x{amount}",
		romance_points: "{villager} とのロマンスポイント x{amount}",
		mail_message: "{villager} のメール",
		visit_from: "{villager} からの訪問",
	},
	recipe: {
		cost: "コスト",
		craft_time: "製作時間",
		required_ingredients: "必要な材料",
		produces: "生産物",
		sold_at: "販売場所",
		vendors: "ベンダー",
		gatherables: "採取可能アイテム",
		mail: "メール",
		recipes: "レシピ",
	},
	villager: {
		gift_preferences: "贈り物の好み",
		weekly_wants: "週間の希望",
		relationship: "{type} レベル {level} - {levelName}（要求値: {requiredValue}）",
	},
	weekly_wants: {
		title: "週間の希望ローテーション",
		description: "{date} の週間の希望ローテーションが利用可能です！完全な週間の希望のリストは {url} で確認できます。",
	},
	miscellaneous: {
		see_more: "{count} もっと見る...",
		no_data: "データがありません。",
	},
};

export default ja_embeds;
