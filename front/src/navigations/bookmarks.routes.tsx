import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Bookmark } from "../types/graphql-schema";
import { BookmarkDetailScreen } from "../features/bookmarks/BookmarkDetailScreen";
import { BookmarksScreen } from "../features/bookmarks/BookmarksMasterScreen";
import { useIsLargeScreen } from "../utils/useIsLargeScreen";

export type BookmarksStackParamList = {
	Bookmark: {
		bookmark: Bookmark,
	},
};

const Drawer = createDrawerNavigator<BookmarksStackParamList>();

export const BookmarksRoutes = () => {

	const isLargeScreen = useIsLargeScreen();

	return (
		<Drawer.Navigator
			openByDefault={true}
			drawerType={ isLargeScreen ? "permanent" : "back" }
			drawerStyle={{ width: (isLargeScreen ? "50%" : "100%") }}
			overlayColor="transparent"
			drawerContent={(props) => <BookmarksScreen {...props} />}
		>
			<Drawer.Screen
				name="Bookmark"
				component={ BookmarkDetailScreen }
				options={({ route }) => ({
					title: route?.params?.bookmark?.title || "Bookmarks",
					subtitle: route?.params?.bookmark?.author?.name || "",
				})}
			/>
		</Drawer.Navigator>
	);
}
