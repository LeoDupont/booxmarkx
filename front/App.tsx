import 'react-native-gesture-handler'; // must be at the very top
import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient } from './src/state/apollo-graphql-client';
import { Navigator } from "./src/navigations";
import { store } from './src/state/redux-store';
// import { AuthContextProvider } from './src/services/auth-context.provider';

export default function App() {
	return (
		<ApolloProvider client={GraphQLClient.client}>
			<Provider store={store}>
				<Navigator/>
			</Provider>
		</ApolloProvider>
	);
}
