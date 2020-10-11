import { Application, Request, Response } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { Config } from "../../config";
import { authChecker } from "./auth-checker";
import { Account } from "../../models/account.model";
import { AccountResolver } from "./account.resolver";
import { auth } from "../utils/authenticated.middleware";

export type GraphqlContext = {
	req: Request,
	res: Response,
	account: Account,
};

/**
 * Initializes the GraphQL endpoint:
 * - Stitches the Schema from all sources
 * - Starts an Apollo server and attaches it to the Express app
 * - Sets up authentication method
 * @param app Express application to attach the GraphQL endpoint to
 */
export async function initGraphqlEndpoint(app: Application) {

	// === Build Schema ===

	const graphqlSchema = await buildSchema({
		resolvers: [AccountResolver],
		authChecker: authChecker
	});

	// === Start server ===

	const graphqlServer = new ApolloServer({

		playground: !Config.IS_PROD,
		schema: graphqlSchema,

		// GraphQL context inherited from Express Request:
		// (example usage: by the Schema's authChecker)
		context: ({ req, res }) => {
			return {
				req,
				res,
				account: req.app.locals.account,
			} as GraphqlContext;
		},
	});

	// === Set the optional auth middleware for /graphql endpoint ===
	// (The middleware will save the authenticated Account in `req.app.locals.account`, and hence in `context` for our `authChecker`)

	app.use(graphqlServer.graphqlPath, auth(true));

	// === Attach server to /graphql as a middleware ===

	graphqlServer.applyMiddleware({ app });
}
