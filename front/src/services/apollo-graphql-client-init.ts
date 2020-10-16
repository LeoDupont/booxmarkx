import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Config } from "../config";
import { TOKEN_KEY } from "./authentication.service";

export module GraphQLClient {

	let _token: string | null;
	/**
	 * Update the token used for subsequent GraphQL requests.
	 */
	export function updateToken(token: string | null) {
		_token = token;
	}

	/**
	 * Sets the token header for every GraphQL request.
	 */
	const useTokenLink = setContext((_, { headers }) => {
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
}
