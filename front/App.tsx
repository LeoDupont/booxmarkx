import 'react-native-gesture-handler'; // must be at the very top
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient } from './src/state/apollo-graphql-client';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import { store } from './src/state/redux-store';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/navigations';

export default function App() {
	return (
		<ApolloProvider client={GraphQLClient.client}>
			<ReduxProvider store={store}>
				<PaperProvider>
					<NavigationContainer>
						<Router />
						<StatusBar style="auto" />
					</NavigationContainer>
				</PaperProvider>
			</ReduxProvider>
		</ApolloProvider>
	);
}
