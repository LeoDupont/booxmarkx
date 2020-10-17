import { gql } from "@apollo/client";
import { Account, MutationRegisterAccountArgs } from "../types/graphql-schema";
import { GraphQLClient } from "../state/apollo-graphql-client";

export module AccountService {

	// =======================================================
	// == GET ACCOUNT
	// =======================================================

	export async function getAccount() {
		const resp = await GraphQLClient.client.query<{ account: Account }>({
			query: gql`
				query {
					account {
						mail
					}
				}
			`,
		});
		return resp.data?.account;
	}

	// =======================================================
	// == CREATE ACCOUNT
	// =======================================================

	export async function createAccount(args: MutationRegisterAccountArgs) {

		const resp = await GraphQLClient.client.mutate<{ registerAccount: Account }>({
			mutation: gql`
				mutation register($mail: String!, $pwd: String!) {
					registerAccount(mail: $mail, pwd: $pwd) {
						_id
					}
				}
			`,
			variables: args,
		});
		console.log(resp);

		return resp?.data?.registerAccount;
	}

}