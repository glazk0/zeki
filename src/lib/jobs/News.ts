import { load } from "cheerio";

import { Job } from "./Job.js";

import { duration } from "../../utils/Commons.js";

import { INews } from "../../@types/index.js";

export class News extends Job {
	name = "News Notifier";

	schedule = "*/5 * * * *";

	delay = duration.seconds(30);

	private locales = ["", "fr-FR", "de-DE", "it-IT", "es-ES"];

	private website = "https://www.palia.com";

	async run(): Promise<void> {
		const data = await this.scrape();
	}

	private async scrape(): Promise<INews[]> {
		const promises = this.locales.map((locale) => {
			return fetch(this.url(locale), {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
			});
		});

		const responses = await Promise.all(promises);

		const data = await Promise.all(
			responses.map((response) => {
				return response.text();
			}),
		);

		const scrape: INews[] = [];

		for (const html of data) {
			const $ = load(html);

			const news = $(".css-ST7ZI article");

			for (const item of news) {
				const title = $(item).find(".css-BubDx a").text();
				const [date, type] = $(item)
					.find("div.u-fs-p3")
					.text()
					.split("|")
					.map((item) => item.trim());
				const image = $(item).find(".css-bHOAO").attr("src");
				const url = $(item).find(".css-BubDx a").attr("href");
				const locale = url?.split("/")[1] === "news" ? "en-US" : url?.split("/")[1];
				const key = url?.split("/").pop();

				scrape.push({
					key,
					title,
					date,
					type,
					image,
					url,
					locale,
				});
			}
		}

		return scrape.reverse();
	}

	private url(locale: string) {
		if (locale.length) {
			return `${this.website}/${locale}/news`;
		}
		return `${this.website}/news`;
	}
}
