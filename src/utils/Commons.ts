import { logger } from "../lib/Logger.js";

/**
 * Wait for a given amount of milliseconds.
 *
 * @param ms - The amount of milliseconds to wait.
 *
 * @returns - Promise<void> The promise.
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Duration in milliseconds for common time units.
 */
export const duration = {
	seconds: (n: number) => n * 1000,
	minutes: (n: number) => n * 1000 * 60,
	hours: (n: number) => n * 1000 * 60 * 60,
	days: (n: number) => n * 1000 * 60 * 60 * 24,
};

/**
 * Converts seconds to days, hours, minutes and seconds.
 *
 * @param seconds - The seconds to convert.
 *
 * @returns - The converted seconds.
 */
export const secondsToDhms = (seconds: number): string => {
	const days = Math.floor(seconds / (3600 * 24));
	const hours = Math.floor((seconds % (3600 * 24)) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const result = [];

	if (days > 0) {
		result.push(`${days} days`);
	}

	if (hours > 0) {
		result.push(`${hours} hours`);
	}

	if (minutes > 0) {
		result.push(`${minutes} minutes`);
	}

	if (remainingSeconds > 0) {
		result.push(`${remainingSeconds} seconds`);
	}

	return result.join(", ");
};

/**
 * Fetches the data from the url.
 *
 * @param url - The url to fetch.
 * @param json - If the response should be json.
 * @param method - The method to use.
 * @param headers - The headers to use.
 * @param body - The body to use.
 *
 * @returns - Promise<any> The response or null.
 */
export async function request<T>(
	url: string,
	type: "json" | "text" = "json",
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	headers: RequestInit["headers"] = {
		"User-Agent": process.env.USER_AGENT || "glazk0.dev/Zeki/DiscordBot",
	},
	body?: RequestInit["body"],
): Promise<T> {
	if (!url) {
		throw new Error("No URL provided.");
	}

	const options: RequestInit = {
		method,
		headers,
	};

	if (body) {
		options.body = JSON.stringify(body);
		options.headers = {
			...options.headers,
			"Content-Type": "application/json",
		};
	}

	try {
		const req = await fetch(url, options);

		if (type === "json") {
			return (await req.json()) as T;
		} else {
			return (await req.text()) as T;
		}
	} catch (error) {
		logger.error(error);
		throw error;
	}
}
