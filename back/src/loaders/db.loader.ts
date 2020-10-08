import { mongoose } from "@typegoose/typegoose";
import { Config } from "../config";

export async function connectToDatabase() {
	await mongoose.connect(Config.MONGODB_URI, {
		dbName: 'booxmarkx',
		useNewUrlParser: true,
	});
}