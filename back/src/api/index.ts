import express from "express";
import { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import { Config } from "../config";
import { initGraphqlEndpoint } from "./graphql/init-graphql";

export async function setupExpress() {

	// Application:
	const app = express();

	// Parsers:
	// app.use(urlencoded({ extended: true }));
	app.use(cookieParser());

	// GraphQL:
	await initGraphqlEndpoint(app);

	// REST:
	// TODO (if enough time :P)

	// Serving:
	console.log("[API] Starting Express server...");
	return new Promise((resolve, reject) => {
		const server = app.listen(Config.PORT, () => {
			console.log("[API] API listening on port " + Config.PORT);
			resolve({ app, server });
		});
	});
}
