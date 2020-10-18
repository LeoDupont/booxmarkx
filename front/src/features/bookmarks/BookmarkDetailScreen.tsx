import React from "react";
import { StyleSheet, Image, Platform, Text, View, useWindowDimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import { RootStackParamList } from "../../navigations";
import { LARGE_SCREEN_MIN_WIDTH, useIsLargeScreen } from "../../utils/useIsLargeScreen";
import { ImageSize } from "../../utils/imageSize";

type BookmarkDetailScreenProps = StackScreenProps<RootStackParamList, 'Bookmark'>;
export const BookmarkDetailScreen: React.FC<BookmarkDetailScreenProps> = (props) => {

	// === Bookmark to dispay ===

	const bookmark = props.route.params?.bookmark;

	if (!bookmark) {
		return (
			<View style={styles.container}>
				<Text>Click on a bookmark to view it</Text>
			</View>
		);
	}

	// === Media size ===
	// TL;DR:
	// - On large screens: between 1/2 and 1/3 of the window's width (1/2 for the exact "details panel" size, 1/3 to get some margins).
	// - On small screens: exactly the screen's width.
	// - Height: between 200 and the screen's height (with some room for the AppBar and action buttons)

	const isLargeScreen = useIsLargeScreen();
	const screenDimensions = useWindowDimensions();

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
			console.log("[Preview] web + embedHtml");
			asset = (
				<div
					dangerouslySetInnerHTML={{__html: bookmark.embedHtml}}
				></div>
			);
		}
	}
	else if (bookmark?.videoSourceUrl) {
		console.log("[Preview] mobile + videoSourceUrl");
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
		console.log("[Preview] thumbnailUrl");
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
			console.log("[Preview] No preview");
			asset = (
				<Text>No preview available.</Text>
			);
		}
	}

	return (
		<View style={styles.container}>
			<Text>Bookmark: {bookmark?.title}</Text>
			<Text>By: {bookmark?.author?.name }</Text>
			{ asset }
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	mediaDimensions: {
		width: "300px",
		height: "300px",
	},
})