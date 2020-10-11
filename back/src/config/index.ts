
/**
 * Not used in the code as dotenv should be used only when needed, which depends on the running environment.
 */
// require('dotenv').config();

/**
 * Loads environment variables and uses defaults.\
 * (Useful for documentation, autocompletion, and typing).
 */
export const Config = {
	/** If the server is running in Production environment */
	IS_PROD: (process.env.BOOXMARKX_ENV === 'prod'),

	/** The application version, as per `package.json` */
	VERSION: process.env.npm_package_version || '?.?.?',

	/** Host's port to listen to */
	PORT: parseInt(process.env.BOOXMARKX_API_PORT!),

	/** Database */
	MONGODB_URI: process.env.BOOXMARKX_MONGODB_URI!,
	DB_NAME: process.env.BOOXMARKX_DB_NAME!,

	/** Tokens */
	TOKEN_SECRET_KEY: process.env.BOOXMARKX_TOKEN_SECRET_KEY!,
};
