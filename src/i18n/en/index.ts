import type { BaseTranslation } from '../i18n-types';

const en = {
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
} satisfies BaseTranslation;

export default en;
