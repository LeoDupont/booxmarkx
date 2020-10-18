import 'react-native-gesture-handler'; // must be at the very top
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Provider as PaperProvider } from "react-native-paper";
import { GraphQLClient } from './src/state/apollo-graphql-client';
// import { Navigator } from "./src/navigations";
import { store } from './src/state/redux-store';
import {  } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { selectAccount } from './src/features/account/accountSlice';
import { useIsLargeScreen } from './src/utils/useIsLargeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SplashScreen } from './src/features/splashscreen';
import { LoginScreen } from './src/features/account/LoginScreen';
import { SignUpScreen } from './src/features/account/SignUpScreen';
import { BookmarksScreen } from './src/features/bookmarks/BookmarksMasterScreen';
import { BookmarkDetailScreen } from './src/features/bookmarks/BookmarkDetailScreen';
import { Router } from './src/navigations';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(props: any) {
	// // State:
	// const { account, loading, tryRestoring } = useSelector(selectAccount);
	// const isLargeScreen = useIsLargeScreen();

	// // === Navigation ===

	// let navigator: JSX.Element;

	// // --- Loading Account ---

	// if (tryRestoring) {
	// 	console.log("[nav] splash");
	// 	navigator = (
	// 		<Stack.Navigator>
	// 			<Stack.Screen
	// 				name="SplashScreen"
	// 				component={ SplashScreen }
	// 			/>
	// 		</Stack.Navigator>
	// 	);
	// }

	// // --- Not signed in ---

	// else if (!account) {
	// 	console.log("[nav] no account");
	// 	navigator = (
	// 		<Stack.Navigator>
	// 			<Stack.Screen
	// 				name="Login"
	// 				component={ LoginScreen }
	// 			/>
	// 			<Stack.Screen
	// 				name="SignUp"
	// 				component={ SignUpScreen }
	// 			/>
	// 		</Stack.Navigator>
	// 	);
	// }

	// // --- Signed in ---

	// else {
	// 	console.log("[nav] account");
	// 	navigator = (
	// 		<Drawer.Navigator
	// 			openByDefault
	// 			drawerType={ isLargeScreen ? "permanent" : "back" }
	// 			drawerStyle={{ width: (isLargeScreen ? "50%" : "100%") }}
	// 			overlayColor="transparent"
	// 			drawerContent={(props) => <BookmarksScreen {...props} />}
	// 		>
	// 			<Drawer.Screen
	// 				name="Bookmark"
	// 				component={ BookmarkDetailScreen }
	// 				initialParams={{

	// 				}}
	// 			/>
	// 		</Drawer.Navigator>
	// 	);
	// }

	return (
		<ApolloProvider client={GraphQLClient.client}>
			<Provider store={store}>
				<PaperProvider>
					<NavigationContainer>
						<Router />
					</NavigationContainer>
				</PaperProvider>
			</Provider>
		</ApolloProvider>
	);
}
