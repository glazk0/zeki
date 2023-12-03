import pino from "pino";

export const createLogger = (id?: string) => {
	return pino({
		level: "info",
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "UTC:yyyy-mm-dd HH:MM:ss",
			},
		},
		base: {
			pid: id,
		},
	});
};

export const logger = createLogger();
