import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, FlatList, Text, View } from "react-native";
import { BookmarkView } from "../../components/molecules/bookmark-view";
import { RootStackParamList } from "../../navigations";
import { BookmarksService } from "../../services/bookmarks.service";
import { Bookmark } from "../../types/graphql-schema";

type BookmarksScreenProps = StackScreenProps<RootStackParamList, 'Bookmarks'>;
export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {

	// State:
	let { loading, error, data } = useQuery<{ bookmarks: Bookmark[] }>(
		BookmarksService.queryBookmarksGql,
	);

	console.log({ loading, error, data });

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

	// Render:
	return (
		<View style={styles.container}>
			<FlatList
				data={data?.bookmarks}
				keyExtractor={item => item._id}
				renderItem={({item}) => BookmarkView({ bookmark: item })}
			></FlatList>
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
