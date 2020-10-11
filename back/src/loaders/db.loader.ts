import { mongoose } from "@typegoose/typegoose";
import { Config } from "../config";

export async function connectToDatabase() {
	console.log("[DB] Connecting to MongoDB...");
	await mongoose.connect(Config.MONGODB_URI, {
		dbName: Config.DB_NAME,

		// Avoid deprecated methods:
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log("[DB] Connection successful");
}
