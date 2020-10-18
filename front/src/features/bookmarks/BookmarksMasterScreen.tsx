import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Appbar, Button, Dialog, Menu, Portal, TextInput as TextInputPaper } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { ICONS } from "../../styles/icons";
import { Bookmark } from "../../types/graphql-schema";
import { BookmarksList } from "./components/BookmarksList";
import { clearTitleFilter, TitleFilter } from "./components/TitleFilter";
import { logOut } from "../account/accountSlice";
import { BookmarksApi } from "./bookmarksApi";

const moreOptionsRef = React.createRef();

export const BookmarksScreen: React.FC<DrawerContentComponentProps> = ({
	navigation,
}) => {
	// State:
	let [isSearching, setIsSearching] = useState(false);
	let [isMoreOptionsVisible, showMoreOptions] = useState(false);
	let [addBVisible, setAddBVisible] = useState(false);
	let [url, setUrl] = useState('');

	const _moreOptionsRef = useRef(moreOptionsRef);
	const dispatch = useDispatch();

	// Sign out:
	const signOut = () => {
		dispatch(logOut());
	};

	// Add bookmark:
	const [
		createBookmark,
		{ data: addBData, loading: addBLoading, error: addBError }
	] = useMutation(
		BookmarksApi.CREATE.mutation, {
			refetchQueries: [{
				query: BookmarksApi.BOOKMARKS.query,
				variables: BookmarksApi.BOOKMARKS.variables(),
			}]
		}
	);
	const add = () => {
		createBookmark({ variables: { url }});
		setAddBVisible(false);
	};

	// Select bookmark:
	const onBookmarkSelect = (bookmark: Bookmark) => {
		console.log("[Bookmarks] clicked", bookmark);
		navigation.navigate("Bookmark", { bookmark });
	};

	// Searchbar:
	const toggleSearchbar = () => {
		if (isSearching) {
			clearTitleFilter();
		}
		setIsSearching(!isSearching);
	}

	// Render:
	return (
		<View>
			<Appbar>
				{ !isSearching && <Appbar.Content title="Bookmarks" /> }

				{ isSearching && <Appbar.Action icon={ICONS.SEARCH} /> }
				{ isSearching && <TitleFilter height={52} color="white" /> }

				<Appbar.Action
					icon={isSearching ? ICONS.CLOSE : ICONS.SEARCH}
					onPress={toggleSearchbar}
				/>
				<Appbar.Action icon={ICONS.FILTER} />
				<Appbar.Action icon={ICONS.ADD} onPress={() => setAddBVisible(true)}/>
				<Menu
					onDismiss={() => showMoreOptions(false)}
					visible={isMoreOptionsVisible}
					anchor={
						<Appbar.Action
							icon={ICONS.OPTIONS}
							onPress={() => showMoreOptions(true)}
							color="white"
						/>
					}
				>
					<Menu.Item icon={ICONS.LOGOUT} title="Log out" onPress={signOut} />
				</Menu>
			</Appbar>

			<BookmarksList onSelect={onBookmarkSelect} />

			<Portal>
				<Dialog visible={addBVisible} onDismiss={() => setAddBVisible(false)}>
					<Dialog.Title>Add a bookmark</Dialog.Title>
					<Dialog.Content>
					<TextInputPaper
						onChangeText={setUrl}
						placeholder="URL..."
						autoCapitalize="none"
						keyboardType="url"
						returnKeyType="done"
					/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={add}>Add bookmark</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<StatusBar style="auto" />
		</View>
	);
}

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
