import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Config } from "../config";

export const client = new ApolloClient({
	uri: `${Config.API_URL}/graphql`,
	cache: new InMemoryCache(),
});
