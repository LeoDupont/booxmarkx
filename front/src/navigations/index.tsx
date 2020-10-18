import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux";
import { AccountRoutes } from "./account.routes";
import { BookmarksRoutes } from "./bookmarks.routes";
import { selectAccount } from "../features/account/accountSlice";

export type RootStackParamList = {
	Account: undefined,
	Bookmarks: undefined,
};

const Stack = createStackNavigator<RootStackParamList>();

export const Router = () => {

	const { account, loading } = useSelector(selectAccount);

	return (
		<Stack.Navigator
			headerMode="none"
		>
			{ (loading || !account) &&
				<Stack.Screen name="Account" component={ AccountRoutes } />
			}
			{ !!account &&
				<Stack.Screen name="Bookmarks" component={ BookmarksRoutes } />
			}
		</Stack.Navigator>
	);
}
