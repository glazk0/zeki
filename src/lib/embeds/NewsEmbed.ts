import { BaseEmbed } from './BaseEmbed.js';

import { INews } from '../../@types/index.js';

export class NewsEmbed extends BaseEmbed {
	constructor(news: INews) {
		super();

		this.data.title = news.type?.length ? `${news.type} - ${news.title}` : news.title;

		this.data.url = news.url;

		if (news.image) this.data.image = { url: news.image };
	}
}
