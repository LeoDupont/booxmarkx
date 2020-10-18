import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Text, FlatList, View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../styles/styles";
import { Bookmark } from "../../../types/graphql-schema";
import { BookmarksApi } from "../bookmarksApi";
import { BookmarkListItem } from "./BookmarkListItem";

type BookmarksListProps = {
	onSelect: Function,
};
export const BookmarksList: React.FC<BookmarksListProps> = ({
	onSelect,
}) => {
	// State:
	const dimensions = useWindowDimensions();

	// Query:
	let { loading, error, data, refetch } = useQuery<{ bookmarks: Bookmark[] }>(
		BookmarksApi.BOOKMARKS.query,
		{
			// Leverages Apollo's reactive variables for every filters:
			variables: BookmarksApi.BOOKMARKS.variables(),
		}
	);

	let [isRefreshing, setIsRefreshing] = useState(false);
	const refresh = () => {
		setIsRefreshing(true);
		refetch()
			.catch(err => console.error(err))
			.then(() => setIsRefreshing(false));
	}

	console.log({ loading, error, data });

	if (loading) {
		return (
			<Text>Loading...</Text>
		);
	}
	if (error) {
		return (
			<Text>Error! {error.message}</Text>
		);
	}

	return (
		<ScrollView style={{ flex: 1 }} scrollEnabled>
			<FlatList
				// scrollEnabled
				// style={{ flex: 1 }}
				// contentContainerStyle={{ flexGrow: 1 }}
				data={data?.bookmarks}
				keyExtractor={item => item._id}
				renderItem={({item}) => (
					<BookmarkListItem
						bookmark={item}
						onSelect={() => onSelect(item)}
					/>
				)}
				refreshing={isRefreshing}
				onRefresh={refresh}
			></FlatList>
		</ScrollView>
	);
};
