import { BaseTranslation } from "../../i18n-types";

const en_discord = {
  settings: {
    name: 'settings',
    description: 'Access and manage your server settings.',
  },
  ['settings.locale']: {
    name: 'locale',
    description: 'Change the language settings for your server.',
  },
  ['settings.locale.value']: {
    name: 'value',
    description: 'Specify the preferred language for your server.',
  },
  ['settings.news']: {
    name: 'news',
    description: 'Control the news settings for your server.',
  },
  ['settings.news.enable']: {
    name: 'enable',
    description: 'Activate the news feature for your server.',
  },
  ['settings.news.enable.channel']: {
    name: 'channel',
    description: 'Designate the channel where news updates will be posted.',
  },
  ['settings.news.disable']: {
    name: 'disable',
    description: 'Deactivate the news feature for your server.',
  },
  help: {
    name: 'help',
    description: "Display a comprehensive list of Zeki's available commands.",
  },
  about: {
    name: 'about',
    description: 'Retrieve detailed information about Zeki.',
  },
  quest: {
    name: 'quest',
    description: 'Search for quests and related information.',
  },
  'quest.query': {
    name: 'query',
    description: 'What quest are you looking for?',
  },
  villager: {
    name: 'villager',
    description: 'Look up information about specific villagers.',
  },
  'villager.query': {
    name: 'query',
    description: 'What villager are you looking for?',
  },
  recipe: {
    name: 'recipe',
    description: 'Search for crafting recipes and crafting details.',
  },
  'recipe.query': {
    name: 'query',
    description: 'What recipe are you looking for?',
  },
  'recipe.amount': {
    name: 'amount',
    description: 'Determine the quantity of items to craft.',
  },
  item: {
    name: 'item',
    description: 'Search for items and item details.',
  },
  'item.query': {
    name: 'query',
    description: 'What item are you looking for?',
  },
  weekly: {
    name: 'weekly',
    description: 'Retrieve weekly preferences and wants of villagers.',
  },
  bundle: {
    name: 'bundle',
    description: 'Search for information about bundles and their contents.',
  },
  'bundle.query': {
    name: 'query',
    description: 'What bundle are you looking for?',
  },
  accomplishment: {
    name: 'accomplishment',
    description: 'Search for accomplishments and achievement details.',
  },
  'accomplishment.query': {
    name: 'query',
    description: 'What accomplishment are you looking for?',
  },
} satisfies BaseTranslation;

export default en_discord;
