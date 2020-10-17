import React, { Component } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { restoreToken } from "../account/accountSlice";

export const SplashScreen = () => {

	const dispatch = useDispatch();

	// Try restoring local token:
	dispatch(restoreToken());

	return (
		<Text>Loading...</Text>
	);
}
