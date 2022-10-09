declare global {
	namespace NodeJS {
		/**
		 * Autocomplete functionality for the process.env
		 */
		interface ProcessEnv {
			SERVER_PORT: number;
			SERVER_HOST: string;
			DB_URI: string;
			PRIVATE_KEY: string;
			TOKEN_EXPIRE: string;
			SALT_WORK_FACTOR: number;
		}
	}
}

export {};
