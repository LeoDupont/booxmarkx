import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from "react-native";
import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import { BookmarksList } from "../../components/organisms/bookmarks-list";
import { RootStackParamList } from "../../navigations";
import { Bookmark } from "../../types/graphql-schema";
import { BookmarksApi } from "./bookmarksApi";

type BookmarksScreenProps = StackScreenProps<RootStackParamList, 'Bookmarks'>;
export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {
	// Filters:
	let [title, setTitleFilter] = useState('');

	// Query:
	let { loading, error, data } = useQuery<{ bookmarks: Bookmark[] }>(
		BookmarksApi.BOOKMARKS.query,
		{
			variables: BookmarksApi.BOOKMARKS.variables({
				title,
			}),
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

	console.log({ data });

	// Render:
	return (
		<KeyboardAvoidingView enabled style={styles.container}>
			<TextInput
				onChangeText={setTitleFilter}
				placeholder="Title..."
				autoCapitalize="sentences"
				keyboardType="default"
				returnKeyType="search"
				defaultValue={title}
			/>
			<BookmarksList
				bookmarks={data?.bookmarks}
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
