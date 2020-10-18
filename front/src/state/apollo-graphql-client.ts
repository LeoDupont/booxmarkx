import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Config } from "../config";
import { TOKEN_KEY } from "../features/account/auth-service";

/**
 * Example usage of Apollo Client as a state management solution.
 * https://www.apollographql.com/blog/dispatch-this-using-apollo-client-3-as-a-state-management-solution/
 */
export module GraphQLClient {

	let _token: string | null;

	/**
	 * Sets the token header for every GraphQL request.
	 */
	const useTokenLink = setContext((_, { headers }) => {
		console.log("[APOLLO] using token:", _token)
		return {
			headers: {
				...headers,
				[TOKEN_KEY]: _token,
			}
		}
	});

	const httpLink = createHttpLink({
		uri: `${Config.API_URL}/graphql`,
	});

	/**
	 * Apollo GraphQL client to the BooxMarkx API endpoint.
	 */
	export const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: useTokenLink.concat(httpLink),
	});

	/**
	 * Update the token used for subsequent GraphQL requests.
	 */
	export async function updateToken(token: string | null) {
		console.log("[APOLLO] udpating token:", token)
		_token = token;
		await client.cache.reset();
	}
}
