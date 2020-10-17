import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from "react-native";
import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import { BookmarksList } from "./components/BookmarksList";
import { RootStackParamList } from "../../navigations";
import { Bookmark, QueryBookmarksArgs } from "../../types/graphql-schema";
import { BookmarksApi } from "./bookmarksApi";
import { BookmarksListFilters } from "./components/BookmarksListFilters";
import { BookmarksScreensList } from ".";

type BookmarksScreenProps = StackScreenProps<BookmarksScreensList, 'Bookmarks'>;
export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
	navigation,
}) => {
	// State:
	let [filters, setFilters] = useState<QueryBookmarksArgs>({});

	// Actions:
	const onBookmarkSelect = (bookmark: Bookmark) => {
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
