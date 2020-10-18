import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { restoreToken, selectAccount } from "./accountSlice";
import { styles } from "../../styles/styles";

export const SplashScreen = () => {

	const { account, loading, tryRestoring } = useSelector(selectAccount);
	const dispatch = useDispatch();

	// Try restoring local token:
	if (!loading && !account && tryRestoring) {
		dispatch(restoreToken());
	}

	return (
		<View style={styles.centeredContainer}>
			<ActivityIndicator size="large" />
		</View>
	);
}
