import type { Translation } from '../i18n-types';

const es = {
  embeds: {
    help: {
      title: "{username}'s commands",
      description: 'Here is a list of all my commands.',
    },
    info: {
      description:
        '{username} is an intuitive and user-friendly Discord bot connected to https://paliapedia.com and has been created by [glazk0](discord://-/users/247344130798256130).',
      statistics_name: 'Statistics',
      statistics_value: 'Servers: {servers}\nUsers: {users}',
      debug_name: 'Debug',
      debug_value:
        'Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}',
    },
  },
  interactions: {
    settings: {
      news: {
        enabled: 'News will now be sent in {channel}.',
        not_enabled: 'News are not enabled for this server.',
        disabled: 'News will no longer be sent in {channel}.',
      },
      weekly_wants: {
        enabled: 'Weekly wants notifications will now be sent in {channel}.',
        not_enabled:
          'Weekly wants notifications are not enabled for this server.',
        disabled:
          'Weekly wants notifications will no longer be sent in {channel}.',
      },
      locale: {
        success: 'The locale has been set to {locale}.',
      },
    },
    miscellaneous: {
      no_permissions:
        "I don't have the permission to view or send messages in {channel}.",
      no_results: 'No results found.',
      no_results_for: 'No results found for "{query}".',
    },
  },
} satisfies Translation;

export default es;
