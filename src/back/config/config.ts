
// Load .env file in process.env:
require('dotenv').config();

/**
 * Loads environment variables and uses defaults.\
 * (Useful for documentation, autocompletion, and typing).
 */
export module Config {
	/** The application version, as per `package.json` */
	const VERSION = process.env.npm_package_version || '?.?.?';

	/** Host's port to listen to */
	const PORT = parseInt(process.env.BOOXMARKX_API_PORT);

	/** Database URI */
	const MONGODB_URI = process.env.BOOXMARKX_MONGODB_URI;
}
