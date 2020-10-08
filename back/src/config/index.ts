
/**
 * Not used in the code as dotenv should be used only when needed, which depends on the running environment.
 */
// require('dotenv').config();

/**
 * Loads environment variables and uses defaults.\
 * (Useful for documentation, autocompletion, and typing).
 */
export const Config = {
	/** The application version, as per `package.json` */
	VERSION: process.env.npm_package_version || '?.?.?',

	/** Host's port to listen to */
	PORT: parseInt(process.env.BOOXMARKX_API_PORT!),

	/** Database URI */
	MONGODB_URI: process.env.BOOXMARKX_MONGODB_URI!,
};
