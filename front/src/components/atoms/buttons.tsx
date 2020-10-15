import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

export type ButtonProps = {
	text: string,
	onPress: (event: GestureResponderEvent) => void,
};

export const PrimaryButton: React.FC<ButtonProps> = ({ text, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<Text>{ text }</Text>
	</TouchableOpacity>
);
