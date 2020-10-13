import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appearance,  } from 'react-native-appearance';

let scheme = Appearance.getColorScheme();
console.log("theme:", scheme);
Appearance.addChangeListener(({ colorScheme }) => {
	scheme = colorScheme;
	console.log("theme_:", scheme);
});

export default function App() {

	return (
		<View style={styles.container}>
			<Text>{ scheme }</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
