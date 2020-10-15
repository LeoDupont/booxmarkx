import { gql } from "@apollo/client";
import { client } from "./apollo-graphql-client-init";

export module AuthenticationService {

	export async function authenticate(mail: string, pwd: string) {

		// === Auth ===

		const resp = await client.mutate({
			mutation: gql`
				mutation authenticate($mail: String!, $pwd: String!) {
					authenticate(mail: $mail, pwd: $pwd, long: true) {
						_id
						mail
						pwd
						createdAt
					}
				}
			`,
			variables: {
				mail,
				pwd,
			}
		});
		console.log(resp);
		return resp.data;
	}

}