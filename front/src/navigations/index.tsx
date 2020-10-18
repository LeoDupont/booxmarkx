import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { BookmarkDetailScreen } from "../features/bookmarks/BookmarkDetailScreen";
import { BookmarksScreen } from "../features/bookmarks/BookmarksMasterScreen";
import { LoginScreen } from "../features/account/LoginScreen";
import { SignUpScreen } from "../features/account/SignUpScreen";
import { SplashScreen } from "../features/splashscreen";
import { selectAccount } from "../features/account/accountSlice";
import { Bookmark } from "../types/graphql-schema";
// import { BookmarksNavigator } from "../features/bookmarks";
import { useIsLargeScreen } from "../utils/useIsLargeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

export type RootStackParamList = {
	SplashScreen: undefined,
	Login: undefined,
	SignUp: undefined,
	Bookmark: {
		bookmark: Bookmark,
	},
}

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

export const Navigator: React.FC<StackScreenProps<RootStackParamList>> = (props) => {
	// State:
	const { account, loading, tryRestoring } = useSelector(selectAccount);

	const isLargeScreen = useIsLargeScreen();

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
		navigator = (
			<Drawer.Navigator
				openByDefault
				drawerType={ isLargeScreen ? "permanent" : "back" }
				drawerStyle={{ width: (isLargeScreen ? "50%" : "100%") }}
				overlayColor="transparent"
				drawerContent={(props) => <BookmarksScreen {...props} />}
			>
				<Drawer.Screen
					name="Bookmark"
					component={ BookmarkDetailScreen }
				/>
			</Drawer.Navigator>
		);
	}

	return (
		<NavigationContainer>
			{ navigator }
		</NavigationContainer>
	)
}