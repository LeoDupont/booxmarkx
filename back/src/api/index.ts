import express from "express";
import { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { AccountResolver } from "./account.resolver";
import { ApolloServer } from "apollo-server-express";
import { Config } from "../config";

export async function setupExpress() {

	// Application:
	const app = express();

	// // Parsers:
	// app.use(urlencoded({ extended: true }));
	// app.use(cookieParser());

	// GraphQL:
	const graphqlSchema = await buildSchema({
		resolvers: [AccountResolver],
	});
	const graphqlServer = new ApolloServer({
		schema: graphqlSchema,
		playground: true,
	});
	graphqlServer.applyMiddleware({ app });

	// Serving:
	return new Promise((resolve, reject) => {
		const server = app.listen(Config.PORT, () => {
			console.log("API listening on port " + Config.PORT);
			console.log("GraphQL endpoint: " + graphqlServer.graphqlPath);
			resolve({ app, server });
		});
	});
}
