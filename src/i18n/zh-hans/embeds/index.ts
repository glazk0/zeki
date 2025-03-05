import type { NamespaceEmbedsTranslation } from '../../i18n-types';

const zh_hans_embeds: NamespaceEmbedsTranslation = {
	help: {
		title: '{username} 的命令',
		description: '这里是我所有命令的列表。您还可以在 Discord 中键入 `/` 来查看它们。'
	},
	about: {
		description:
			'{username} 是一个直观且用户友好的 Discord 机器人，连接到 https://paliapedia.com，由 {developers} 创建。',
		statistics_name: '统计信息',
		statistics_value: '服务器：{servers}\n用户：{users}',
		debug_name: 'Debug',
		debug_value: 'Shards：{shards}\nShardID：{shardId}'
	},
	item: {
		category: '类别',
		rarity: '稀有度',
		quality: '质量',
		cost: '成本',
		value: '价值',
		sold_at: '售价',
		crafted_by: '制作者',
		gathered_from: '采集自',
		quest_reward_from: '任务奖励自',
		attached_to: '附加到',
		obtained_by_reading: '阅读获取',
		reward_from: '奖励自',
		obtained_from: '获取自',
		ingredient_for_recipe: '配方所需材料',
		needed_for_quest: '任务所需',
		contains_item: '包含物品'
	},
	quest: {
		starts_with: '起始于',
		requirement: '要求',
		requirements: '需求',
		branching_goals: '完成以下 {count} 个目标中的 {count}',
		turn_in: '交付',
		quest_return: '任务回报',
		reward: '奖励',
		rewards: '奖励',
		friendship_points: '与 {villager} 的友谊点数：x{amount}',
		romance_points: '与 {villager} 的浪漫点数：x{amount}',
		mail_message: '{villager} 的邮件',
		visit_from: '{villager} 的拜访'
	},
	recipe: {
		cost: '成本',
		craft_time: '制作时间',
		required_ingredients: '所需材料',
		produces: '产出',
		sold_at: '售价',
		vendors: '供应商',
		gatherables: '可采集物品',
		mail: '邮寄',
		recipes: '配方'
	},
	villager: {
		gift_preferences: '礼物偏好',
		weekly_wants: '每周愿望',
		relationship: '{type} 等级 {level} - {levelName}（需要 {requiredValue}）'
	},
	weekly_wants: {
		title: '每周愿望轮换',
		description: '现在可以查看 {date} 的每周愿望轮换！您可以在 {url} 上找到完整的每周愿望列表。'
	},
	miscellaneous: {
		see_more: '查看 {count} 条更多……',
		no_data: '无可用数据。'
	}
};

export default zh_hans_embeds;
