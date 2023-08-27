import { Embed } from '../../lib/embeds/Embed';
import { Context } from '../../structures/Interaction';

export class AboutEmbed extends Embed {
  constructor(data: any, { i18n }: Context) {
    super();

    this.data.author = {
      name: this.client.user!.username,
      icon_url: this.client.user!.displayAvatarURL(),
    };

    this.data.thumbnail = { url: this.client.user!.displayAvatarURL() };

    this.data.description = i18n.embeds.info.description({
      username: this.client.user?.username,
    });

    this.data.fields = [
      {
        name: i18n.embeds.info.statistics_name(),
        value: i18n.embeds.info.statistics_value({
          servers: data.guilds.toLocaleString('en-US'),
          users: data.users.toLocaleString('en-US'),
        }),
      },
      {
        name: i18n.embeds.info.debug_name(),
        value: i18n.embeds.info.debug_value({
          clusters: this.client.cluster.count,
          shards: this.client.cluster.info.TOTAL_SHARDS,
          shardId: data.shardId,
          clusterId: this.client.cluster.id,
        }),
      },
    ];
  }
}
