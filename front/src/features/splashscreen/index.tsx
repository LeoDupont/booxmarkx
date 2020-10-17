import React, { Component } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { restoreToken, selectAccount } from "../account/accountSlice";

export const SplashScreen = () => {

	const { loading } = useSelector(selectAccount);
	const dispatch = useDispatch();

	// Try restoring local token:
	if (!loading) {
		dispatch(restoreToken());
	}

	return (
		<Text>Loading...</Text>
	);
}
