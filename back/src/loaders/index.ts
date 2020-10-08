import { setupExpress } from "../api";
import { connectToDatabase } from "./db.loader";

export async function loadApp() {

	// DB:
	await connectToDatabase();

	// Express:
	await setupExpress();
}