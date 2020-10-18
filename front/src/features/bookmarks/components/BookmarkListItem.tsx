import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageSourcePropType, ImageURISource } from "react-native";
import { Bookmark } from "../../../types/graphql-schema";

// =======================================================
// == LOGOS
// =======================================================

type ImageDictionary = { [key: string]: ImageURISource };

const PROVIDERS_LOGOS: ImageDictionary = {
	Vimeo: require('../../../assets/providers/vimeo.svg'),
	Flickr: require('../../../assets/providers/flickr.svg'),
};

const MEDIA_TYPES_LOGOS: ImageDictionary = {
	video: require('../../../assets/media-types/video.svg'),
	image: require('../../../assets/media-types/image.svg'),
	unknown: require('../../../assets/media-types/unknown.svg'),
};

// =======================================================
// == BookmarkView
// =======================================================

type BookmarkListItemProps = {
	bookmark: Bookmark,
	onSelect: Function,
};
export const BookmarkListItem: React.FC<BookmarkListItemProps> = ({
	bookmark,
	onSelect,
}) => {

	let imageSource: ImageSourcePropType;
	if (bookmark.thumbnailUrl) {
		imageSource = { uri: bookmark.thumbnailUrl };
	}
	else {
		imageSource = PROVIDERS_LOGOS[bookmark.source]
			|| MEDIA_TYPES_LOGOS[bookmark.type]
			|| MEDIA_TYPES_LOGOS.unknown;
	}

	return (
		<TouchableOpacity
			key={bookmark._id}
			onPress={() => onSelect()}
		>
			<View style={{ flexDirection: 'row' }}>
				<Image
					source={imageSource}
					width={styles.thumb.width}
					height={styles.thumb.height}
					style={styles.thumb}
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

const styles = StyleSheet.create({

	thumb: {
		width: 50,
		height: 50,
	}

});
