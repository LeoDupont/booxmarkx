import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { BookmarksList } from "./components/BookmarksList";
import { Bookmark, QueryBookmarksArgs } from "../../types/graphql-schema";
import { BookmarksListFilters } from "./components/BookmarksListFilters";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

export const BookmarksScreen: React.FC<DrawerContentComponentProps> = ({
	navigation,
}) => {
	// State:
	let [filters, setFilters] = useState<QueryBookmarksArgs>({});

	// Actions:
	const onBookmarkSelect = (bookmark: Bookmark) => {
		console.log("[Bookmarks] clicked", bookmark);
		navigation.navigate("Bookmark", { bookmark });
	};

	// Render:
	return (
		<KeyboardAvoidingView enabled style={styles.container}>
			<BookmarksListFilters
				onFilterChange={setFilters}
			/>
			<BookmarksList
				filters={filters}
				onSelect={onBookmarkSelect}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
