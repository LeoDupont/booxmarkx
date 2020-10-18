import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../styles/styles";
import { restoreToken, selectAccount } from "../account/accountSlice";

export const SplashScreen = () => {

	const { loading, account } = useSelector(selectAccount);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	// Try restoring local token:
	if (!loading && !account) {
		dispatch(restoreToken());
	}

	return (
		<View style={styles.centeredContainer}>
			<ActivityIndicator size="large" />
		</View>
	);
}
