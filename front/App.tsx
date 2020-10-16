import 'react-native-gesture-handler'; // must be at the very top
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient } from './src/services/apollo-graphql-client-init';
import { Navigator } from "./src/navigations";
import { AuthContextProvider } from './src/services/auth-context.provider';

export default function App() {
	return (
		<ApolloProvider client={GraphQLClient.client}>
			<AuthContextProvider>
				<Navigator/>
			</AuthContextProvider>
		</ApolloProvider>
	);
}
