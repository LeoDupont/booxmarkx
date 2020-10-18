import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, View, Platform } from "react-native";
import { Appbar } from "react-native-paper";
import { BookmarksList } from "./components/BookmarksList";
import { Bookmark, QueryBookmarksArgs } from "../../types/graphql-schema";
import { BookmarksListFilters } from "./components/BookmarksListFilters";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { ICONS } from "../../styles/icons";

export const BookmarksScreen: React.FC<DrawerContentComponentProps> = ({
	navigation,
}) => {
	// State:
	// let [filters, setFilters] = useState<QueryBookmarksArgs>({});
	// const

	// Actions:
	const onBookmarkSelect = (bookmark: Bookmark) => {
		console.log("[Bookmarks] clicked", bookmark);
		navigation.navigate("Bookmark", { bookmark });
	};

	// Render:
	return (
		<View>
			<Appbar>
				<Appbar.Content title="Bookmarks" />
				<Appbar.Action icon={ICONS.SEARCH} onPress={() => {}}/>
				<Appbar.Action icon={ICONS.FILTER} />
				<Appbar.Action icon={ICONS.OPTIONS} />
			</Appbar>
			<KeyboardAvoidingView enabled style={styles.container}>
				<BookmarksListFilters
					// onFilterChange={setFilters}
				/>
				<BookmarksList
					// filters={filters}
					onSelect={onBookmarkSelect}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
