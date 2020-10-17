import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations";
import { BookmarkDetailScreen } from "./BookmarkDetailScreen";
import { BookmarksScreen } from "./BookmarksMasterScreen";
import { Bookmark } from "../../types/graphql-schema";

export type BookmarksScreensList = {
	Bookmarks: undefined,
	Bookmark: {
		bookmark: Bookmark,
	},
}

const Stack = createStackNavigator<BookmarksScreensList>();

export const BookmarksNavigator = () => {
	return (
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
};