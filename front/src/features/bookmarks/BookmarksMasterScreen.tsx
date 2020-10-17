import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import { BookmarksList } from "../../components/organisms/bookmarks-list";
import { RootStackParamList } from "../../navigations";
import { Bookmark } from "../../types/graphql-schema";
import { BookmarksApi } from "./bookmarksApi";

type BookmarksScreenProps = StackScreenProps<RootStackParamList, 'Bookmarks'>;
export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {

	// State:
	let { loading, error, data } = useQuery<{ bookmarks: Bookmark[] }>(
		BookmarksApi.queryBookmarksGql,
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
			<BookmarksList
				bookmarks={data?.bookmarks}
			/>
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
