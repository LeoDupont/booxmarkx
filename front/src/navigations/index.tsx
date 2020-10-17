import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BookmarkDetailScreen } from "../features/bookmarks/bookmarks-details";
import { BookmarksScreen } from "../features/bookmarks/bookmarks-master";
import { LoginScreen } from "../features/account/LoginScreen";
import { SignUpScreen } from "../features/account/SignUpScreen";
import { SplashScreen } from "../features/splashscreen";
import { selectAccount } from "../features/account/accountSlice";

export type RootStackParamList = {
	SplashScreen: undefined,
	Login: undefined,
	SignUp: undefined,
	Bookmarks: undefined,
	Bookmark: undefined,
}

const Stack = createStackNavigator<RootStackParamList>();

export const Navigator = () => {
	const { account, loading, tryRestoring } = useSelector(selectAccount);

	console.log("Navigator:", { account, loading });

	let navigator: JSX.Element;

	// === Loading Account ===

	if (tryRestoring) {
		console.log("[nav] splash");
		navigator = (
			<Stack.Navigator>
				<Stack.Screen
					name="SplashScreen"
					component={ SplashScreen }
				/>
			</Stack.Navigator>
		);
	}

	// === Not signed in ===

	else if (!account) {
		console.log("[nav] no account");
		navigator = (
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
	}

	// === Signed in ===

	else {
		console.log("[nav] account");
		navigator =(
			<Stack.Navigator>
				<Stack.Screen
					name="Bookmarks"
					component={ BookmarksScreen }
				/>
				<Stack.Screen
					name="Bookmark"
					component={ BookmarkDetailScreen }
				/>
			</Stack.Navigator>
		);
	}

	return (
		<NavigationContainer>
			{ navigator }
		</NavigationContainer>
	)
}