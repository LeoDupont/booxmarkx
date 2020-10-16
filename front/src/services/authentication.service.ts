import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthResponse, MutationAuthenticateArgs } from "../types/graphql-schema";
import { GraphQLClient } from "./apollo-graphql-client-init";

export const TOKEN_KEY = "boox-tk";

export module AuthenticationService {

	// =======================================================
	// == AUTHENTICATE
	// =======================================================

	export async function authenticate(args: MutationAuthenticateArgs) {

		// === Auth ===

		const resp = await GraphQLClient.client.mutate<{ authenticate: AuthResponse }>({
			mutation: gql`
				mutation authenticate($mail: String!, $pwd: String!) {
					authenticate(mail: $mail, pwd: $pwd, long: true) {
						token
						account {
							_id
							mail
						}
					}
				}
			`,
			variables: args,
		});
		console.log(resp);

		// === Token ===

		if (resp.data?.authenticate?.token) {
			await saveToken(resp.data.authenticate.token);
		}

		return resp.data?.authenticate;
	}

	// =======================================================
	// == SESSION MANAGEMENT
	// =======================================================

	/**
	 * Updates Apollo GraphQL client's authLink to provide the token in subsequent requests.
	 * @param token Token to use. Null to delete token.
	 */
	export function useToken(token: string | null) {
		GraphQLClient.updateToken(token);
	}

	async function saveToken(token: string | null) {
		if (token) {
			await AsyncStorage.setItem(TOKEN_KEY, token);
		}
		else {
			await AsyncStorage.removeItem(TOKEN_KEY);
		}
		useToken(token);
	}

	export async function retrieveToken(throws?: boolean) {
		const token = await AsyncStorage.getItem(TOKEN_KEY);
		if (!token && throws) {
			throw new Error("No token saved");
		}
		useToken(token);
		return token;
	}

	export async function removeToken() {
		saveToken(null);
	}
}