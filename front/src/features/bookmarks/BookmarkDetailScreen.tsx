import React, { useState } from "react";
import { StyleSheet, Image, Platform, Text, View, useWindowDimensions, Linking, TouchableHighlight, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Appbar, Dialog, Headline, Menu, Paragraph, Portal, Subheading, Button } from "react-native-paper";
import { BookmarksStackParamList } from "../../navigations/bookmarks.routes";
import { LARGE_SCREEN_MIN_WIDTH, useIsLargeScreen } from "../../utils/useIsLargeScreen";
import { ImageSize } from "../../utils/imageSize";
import { ICONS } from "../../styles/icons";
import { styles } from "../../styles/styles";
import { useMutation } from "@apollo/client";
import { BookmarksApi } from "./bookmarksApi";

const render = (appBar: JSX.Element, content: JSX.Element) => {
	return (
		<View style={styles.screenWithAppbarContainer}>
			{ appBar }
			{ content }
		</View>
	);
}

type BookmarkDetailScreenProps = StackScreenProps<BookmarksStackParamList, 'Bookmark'>;
export const BookmarkDetailScreen: React.FC<BookmarkDetailScreenProps> = (props) => {
	// State:
	let [isConfirmDeleteVisible, showConfirmDelete] = useState(false);
	let [isMoreOptionsVisible, showMoreOptions] = useState(false);
	const navigation = useNavigation();
	const isLargeScreen = useIsLargeScreen();
	const screenDimensions = useWindowDimensions();

	// === Bookmark to dispay ===

	const bookmark = props.route.params?.bookmark;

	// === Delete Bookmark ===
	const [
		deleteBookmark,
		{ data: deleteBData, loading: deleteBLoading, error: deleteBError }
	] = useMutation(
		BookmarksApi.DELETE.mutation, {
			refetchQueries: [{
				query: BookmarksApi.BOOKMARKS.query,
				variables: BookmarksApi.BOOKMARKS.variables(),
			}]
		}
	);
	const _deleteBookmark = () => {
		deleteBookmark({ variables: { id: bookmark._id }});
		showConfirmDelete(false);
	};

	// === AppBar ===

	const title = bookmark?.title || "";
	const subtitle = bookmark?.author?.name || "";

	const appBar = (
		<View>

			<Appbar>
				{ !!bookmark && !isLargeScreen &&
					<Appbar.BackAction onPress={navigation.goBack}/>
				}
				<Appbar.Content title={title} subtitle={subtitle} />
				{ !!bookmark &&
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
						<Menu.Item
							icon={ICONS.DELETE}
							title="Delete"
							onPress={() => showConfirmDelete(true)}
						/>
					</Menu>
				}
			</Appbar>

			<Portal>
				<Dialog
					visible={isConfirmDeleteVisible}
					onDismiss={() => showConfirmDelete(false)}
				>
					<Dialog.Title>Delete {title}</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							Are you sure?
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={_deleteBookmark}>Yes, delete it</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);

	let content: JSX.Element;

	if (!bookmark) {
		content = (
			<View style={styles.centeredContainer}>
				<Text>Click on a bookmark to view it</Text>
			</View>
		);
		return render(appBar, content);
	}

	// === Media size ===
	// TL;DR:
	// - On large screens: between 1/2 and 1/3 of the window's width (1/2 for the exact "details panel" size, 1/3 to get some margins).
	// - On small screens: exactly the screen's width.
	// - Height: between 200 and the screen's height (with some room for the AppBar and action buttons)

	const mediaDimensions = {
		width: bookmark.width,
		height: bookmark.height,
	};

	const wantedWidth = isLargeScreen
		? Math.floor(screenDimensions.width / 3)
		: screenDimensions.width;
	const minWidth = LARGE_SCREEN_MIN_WIDTH / 2;

	// TODO: compute real header/actions height:
	const wantedHeight = screenDimensions.height - 200;
	const minHeight = 200;

	const previewDimensions = ImageSize.getDimensions(
		{ dims: mediaDimensions },
		{
			wantedWidth, minWidth,
			wantedHeight, minHeight,
		}
	);

	// === Media rendering method ===

	/**
	 * For videos:
	 * - On Web => use embed code provided by oEmbed.
	 * - On mobile => embed the videoSourceURl in a WebView
	 *
	 * For images (or when video preview isn't possible):
	 * - Display the thumbnail.
	 *
	 * When there is no preview avaible:
	 * - Print "No preview available".
	 */
	let asset: JSX.Element | undefined;
	if (Platform.OS === 'web') {
		if (bookmark?.type === 'video' && bookmark?.embedHtml) {
			asset = (
				<div
					dangerouslySetInnerHTML={{__html: bookmark.embedHtml}}
				></div>
			);
		}
	}
	else if (bookmark?.videoSourceUrl) {
		asset = (
			<WebView
				source={{
					uri: bookmark.videoSourceUrl
				}}
				originWhitelist={['*']}
				style={previewDimensions}
				scalesPageToFit={true}
				onError={console.error}
				onMessage={console.log}
				renderError={() => <Text>Media rendering failed.</Text>}
				renderLoading={() => <Text>Rendering media...</Text>}
			/>
		);
	}
	if (!asset) {
		if (bookmark?.imageUrl) {
			asset = (
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: bookmark.imageUrl }}
						width={previewDimensions.width}
						height={previewDimensions.height}
						style={previewDimensions}
					/>
				</View>
			);
		}
		else {
			asset = (
				<Text>No preview available.</Text>
			);
		}
	}

	return render(appBar, (
		<View style={_styles.container}>
			<View style={_styles.mediaContainer}>
				{ asset }
			</View>
			<View style={_styles.detailsContainer}>
				<Headline style={_styles.text}>
					<TouchableOpacity
						onPress={() => Linking.openURL(bookmark.pageUrl)}
					>
						<Text style={_styles.link}>{bookmark.title}</Text>
					</TouchableOpacity>
				</Headline>
				<Subheading style={_styles.text}>
					By&nbsp;
					{ bookmark.author ? (
						<TouchableOpacity
							onPress={() => Linking.openURL(bookmark.author!.url)}
						>
							<Text style={_styles.link}>{bookmark.author.name}</Text>
						</TouchableOpacity>
					) : (
						"unknown"
					)}
				</Subheading>
			</View>
		</View>
	));
}

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
		height: '100%',
	},

	mediaContainer: {
		marginTop: 7,
	},

	detailsContainer: {
		flex: 1,
		height: '100%'
	},

	mediaDimensions: {
		width: "300px",
		height: "300px",
	},

	text: {
		color: '#444',
	},

	link: {
		textDecorationLine: "underline",
	}
})