import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { QueryBookmarksArgs } from "../../../types/graphql-schema";

type BookmarksListFiltersProps = {
	onFilterChange: Function,
}
export const BookmarksListFilters: React.FC<BookmarksListFiltersProps> = ({
	onFilterChange
}) => {
	const filter: QueryBookmarksArgs = {};

	// State:
	const setTitleFilter = (value: string) => {
		onFilterChange({
			...filter,
			title: value,
		});
	};
	const setTags = (value: string[]) => {
		onFilterChange({
			...filter,
			tags: value,
		});
	};
	const setAuthors = (value: string[]) => {
		onFilterChange({
			...filter,
			authors: value,
		});
	};
	const setSources = (value: string[]) => {
		onFilterChange({
			...filter,
			sources: value,
		});
	};
	const setTypes = (value: string[]) => {
		onFilterChange({
			...filter,
			types: value,
		});
	};

	// Render:
	return (
		<View>
			<TextInput
				onChangeText={setTitleFilter}
				placeholder="Title..."
				returnKeyType="search"
			/>
		</View>
	);
};