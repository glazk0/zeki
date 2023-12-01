declare namespace NodeJS {
	interface ProcessEnv {
		TOKEN: string;
		USER_AGENT: string;
		POSTGRES_HOST: string;
		POSTGRES_PORT: number;
		POSTGRES_USER: string;
		POSTGRES_PASSWORD: string;
		POSTGRES_DATABASE: string;
		DATABASE_URL: string;
		REDIS_HOST: string;
		REDIS_PORT: number;
		REDIS_PASSWORD: string;
	}
}
