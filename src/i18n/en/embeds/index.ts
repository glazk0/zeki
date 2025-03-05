import type { BaseTranslation } from '../../i18n-types';

const en_embeds: BaseTranslation = {
	help: {
		title: "{username}'s commands",
		description: 'Here is a list of all my commands. You can also see them when you type `/` in Discord.'
	},
	about: {
		description:
			'{username} is an intuitive and user-friendly Discord bot connected to https://paliapedia.com and has been created by {developers}.',
		statistics_name: 'Statistics',
		statistics_value: 'Servers: {servers}\nUsers: {users}',
		debug_name: 'Debug',
		debug_value: 'Shards: {shards}\nShardID: {shardId}'
	},
	item: {
		category: 'Category',
		rarity: 'Rarity',
		quality: 'Quality',
		cost: 'Cost',
		value: 'Value',
		sold_at: 'Sold at',
		crafted_by: 'Crafted by',
		gathered_from: 'Gathered from',
		quest_reward_from: 'Quest reward from',
		attached_to: 'Attached to',
		obtained_by_reading: 'Obtained by reading',
		reward_from: 'Reward from',
		obtained_from: 'Obtained from',
		ingredient_for_recipe: 'Ingredient for recipe',
		needed_for_quest: 'Needed for quest',
		contains_item: 'Contains item'
	},
	quest: {
		starts_with: 'Starts with',
		requirement: 'Requirement',
		requirements: 'Requirements',
		branching_goals: 'Complete {count} of the following',
		turn_in: 'Turn in',
		quest_return: 'Quest return',
		reward: 'Reward',
		rewards: 'Rewards',
		friendship_points: 'x{amount} Friendship Points with {villager}',
		romance_points: 'x{amount} Romance Points with {villager}',
		mail_message: "{villager}'s mail",
		visit_from: 'A visit from {villager}'
	},
	recipe: {
		cost: 'Cost',
		craft_time: 'Craft time',
		required_ingredients: 'Required ingredients',
		produces: 'Produces',
		sold_at: 'Sold at',
		vendors: 'Vendors',
		gatherables: 'Gatherables',
		mail: 'Mail',
		recipes: 'Recipes'
	},
	villager: {
		gift_preferences: 'Gift preferences',
		weekly_wants: 'Weekly wants',
		relationship: '{type} level {level} - {levelName} (Requires {requiredValue})'
	},
	weekly_wants: {
		title: 'Weekly Wants Rotation',
		description:
			'The weekly wants rotation for {date} is now available! You can find the full list of weekly wants on {url}.'
	},
	miscellaneous: {
		see_more: 'See {count} more ...',
		no_data: 'No data available.'
	}
};

export default en_embeds;
