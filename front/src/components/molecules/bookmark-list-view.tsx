import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageSourcePropType, ImageURISource } from "react-native";
import { Bookmark } from "../../types/graphql-schema";

// =======================================================
// == LOGOS
// =======================================================

type ImageDictionary = { [key: string]: ImageURISource };

const PROVIDERS_LOGOS: ImageDictionary = {
	Vimeo: require('../../assets/providers/vimeo.svg'),
	Flickr: require('../../assets/providers/flickr.svg'),
};

const MEDIA_TYPES_LOGOS: ImageDictionary = {
	video: require('../../assets/media-types/video.svg'),
	image: require('../../assets/media-types/image.svg'),
	unknown: require('../../assets/media-types/unknown.svg'),
};

// =======================================================
// == BookmarkView
// =======================================================

type BookmarkViewProps = { bookmark: Bookmark };
export const BookmarkView: React.FC<BookmarkViewProps> = ({ bookmark }) => {

	let imageSource: ImageSourcePropType;
	if (bookmark.thumbnailUrl) {
		imageSource = { uri: bookmark.thumbnailUrl };
	}
	else {
		imageSource = PROVIDERS_LOGOS[bookmark.source]
			|| MEDIA_TYPES_LOGOS[bookmark.type]
			|| MEDIA_TYPES_LOGOS.unknown;
	}

	console.log("imageSource:", imageSource);

	return (
		<TouchableOpacity
			key={bookmark._id}
			onPress={() => console.log(bookmark)}
		>
			<View style={{ flexDirection: 'row' }}>
				<Image
					source={imageSource}
					width={bookmarkViewStyles.thumb.width}
					height={bookmarkViewStyles.thumb.height}
					style={bookmarkViewStyles.thumb}
				/>
				<View>
					<Text>{bookmark.title}</Text>
					<Text>{bookmark.author?.name || 'unknown'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

// =======================================================
// == STYLES
// =======================================================

const bookmarkViewStyles = StyleSheet.create({

	thumb: {
		width: 50,
		height: 50,
	}

});
