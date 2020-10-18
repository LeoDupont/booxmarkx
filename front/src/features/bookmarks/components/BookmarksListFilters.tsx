import React from "react";
import { TextInput, View } from "react-native";
import { BookmarksApi } from "../bookmarksApi";

type BookmarksListFiltersProps = {}
export const BookmarksListFilters: React.FC<BookmarksListFiltersProps> = () => {
	// State:
	const setTitle = BookmarksApi.FILTERS.title;

	// Render:
	return (
		<View>
			<TextInput
				onChangeText={setTitle}
				placeholder="Title..."
				returnKeyType="search"
			/>
		</View>
	);
};