import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { Text } from "react-native";
import { BookmarksScreensList } from ".";
import { RootStackParamList } from "../../navigations";
import { Bookmark } from "../../types/graphql-schema";

type BookmarkDetailScreenProps = StackScreenProps<BookmarksScreensList, 'Bookmark'>;
export const BookmarkDetailScreen: React.FC<BookmarkDetailScreenProps> = (props) => {

	const bookmark = props.route.params.bookmark;

	return (
		<Text>Bookmark: {bookmark.title}</Text>
	);
}
