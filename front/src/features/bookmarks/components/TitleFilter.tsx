import React from "react";
import { ColorValue, TextInput } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { BookmarksApi } from "../bookmarksApi";

export const clearTitleFilter = () => {
	BookmarksApi.FILTERS.title('');
};

type TitleFilterProps = {
	height: number,
	color: ColorValue,
};
export const TitleFilter: React.FC<TitleFilterProps> = (props) => {
	const setTitle = BookmarksApi.FILTERS.title;
	const title = useReactiveVar(setTitle);
	return (
		<TextInput
			value={title}
			onChangeText={setTitle}
			style={{
				flex: 1,
				elevation: 0,
				height: props.height,
				color: props.color,
			}}
			placeholder="Search..."
			placeholderTextColor={ props.color }
		/>
	);
};
