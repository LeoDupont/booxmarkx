import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BookmarkScreen } from "../screens/bookmark";
import { BookmarksScreen } from "../screens/bookmarks";
import { LoginScreen } from "../screens/login";
import { SignUpScreen } from "../screens/signup";
import { AuthContext } from "../services/auth-context.provider";
import { LoadingScreen } from "../screens/loading";

export type RootStackParamList = {
	Loading: undefined,
	Login: undefined,
	SignUp: undefined,
	Bookmarks: undefined,
	Bookmark: undefined,
}

const Stack = createStackNavigator<RootStackParamList>();

export const Navigator = () => {
	const authCtx = React.useContext(AuthContext);
	const authState = authCtx.getState();

	const loadingNavigator = (
		<Stack.Navigator>
			<Stack.Screen name="Loading" component={ LoadingScreen } />
		</Stack.Navigator>
	);

	const authNavigator = (
		<Stack.Navigator>
			<Stack.Screen
				name="Login"
				component={ LoginScreen }
			/>
			<Stack.Screen
				name="SignUp"
				component={ SignUpScreen }
			/>
		</Stack.Navigator>
	);

	const appNavigator = (
		<Stack.Navigator>
			<Stack.Screen
				name="Bookmarks"
				component={ BookmarksScreen }
			/>
			<Stack.Screen
				name="Bookmark"
				component={ BookmarkScreen }
			/>
		</Stack.Navigator>
	);

	return (
		<NavigationContainer>
			{
				authState.loading ? loadingNavigator : (
					authState.account ? appNavigator :
					authNavigator
				)
			}
		</NavigationContainer>
	)
}