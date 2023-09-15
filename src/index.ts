import 'reflect-metadata';
import 'dotenv/config';

import { ClusterManager } from 'discord-hybrid-sharding';

import { Logger } from './lib/Logger';
import { registerClusterEvents } from './lib/RegisterEvents';

const manager = new ClusterManager(`${__dirname}/structures/Client.js`, {
  totalShards: 'auto',
  totalClusters: 'auto',
  mode: 'process',
  shardsPerClusters: 8,
  token: process.env.TOKEN,
});

registerClusterEvents(manager, Logger);

manager
  .spawn({
    timeout: -1,
  })
  .catch((reason: any) =>
    Logger.error('Shard spawn has occured a error', reason),
  );
