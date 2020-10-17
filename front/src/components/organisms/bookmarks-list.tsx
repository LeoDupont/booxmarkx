import React from "react";
import { FlatList } from "react-native";
import { Bookmark } from "../../types/graphql-schema";
import { BookmarkView } from "../molecules/bookmark-list-view";

type BookmarksListProps = { bookmarks?: Bookmark[] };
export const BookmarksList: React.FC<BookmarksListProps> = ({ bookmarks }) => {

	return (
		<FlatList
			data={bookmarks}
			keyExtractor={item => item._id}
			renderItem={({item}) => BookmarkView({ bookmark: item })}
		></FlatList>
	);
};