import { Embed } from '../../lib/embeds/Embed';

import { INews } from '../../types';

export class NewsEmbed extends Embed {
  constructor(news: INews) {
    super();

    this.data.title = news.type?.length
      ? `${news.type} - ${news.title}`
      : news.title;

    this.data.url = news.url;

    if (news.image) this.data.image = { url: `https:${news.image}` };
  }
}
