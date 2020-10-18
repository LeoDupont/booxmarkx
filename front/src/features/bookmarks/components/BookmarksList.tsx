import { useQuery } from "@apollo/client";
import React from "react";
import { Text, FlatList } from "react-native";
import { Bookmark } from "../../../types/graphql-schema";
import { BookmarksApi } from "../bookmarksApi";
import { BookmarkListItem } from "./BookmarkListItem";

type BookmarksListProps = {
	onSelect: Function,
};
export const BookmarksList: React.FC<BookmarksListProps> = ({
	onSelect,
}) => {
	// Query:
	let { loading, error, data } = useQuery<{ bookmarks: Bookmark[] }>(
		BookmarksApi.BOOKMARKS.query,
		{
			// Leverages Apollo's reactive variables for every filters:
			variables: BookmarksApi.BOOKMARKS.variables(),
		}
	);

	console.log({ loading, error });

	if (loading) {
		return (
			<Text>Loading...</Text>
		);
	}
	if (error) {
		return (
			<Text>Error! {error.message}</Text>
		)
	}

	return (
		<FlatList
			data={data?.bookmarks}
			keyExtractor={item => item._id}
			renderItem={({item}) => BookmarkListItem({
				bookmark: item,
				onSelect: () => onSelect(item),
			})}
		></FlatList>
	);
};