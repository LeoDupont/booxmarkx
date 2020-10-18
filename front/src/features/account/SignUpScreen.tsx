import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { styles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { AccountService } from "./account-service";

export const SignUpScreen = () => {

	// State:
	let [mail, setMail] = useState('');
	let [pwd, setPwd] = useState('');
	let [pwdConfirm, setPwdConfirm] = useState('');
	let [result, setResult] = useState('');
	let [errorMsg, setErrorMsg] = useState('');

	const dispatch = useDispatch();
	const navigation = useNavigation();

	// Create:
	const create = () => {
		Keyboard.dismiss();
		if (pwd === pwdConfirm) {
			// dispatch(signUp({ mail, pwd }));
			AccountService.createAccount({ mail, pwd })
				.then(() => navigation.navigate("LogIn", { justSignedUp: true }))
				.catch(err => setErrorMsg(err.message));
		}
		else {
			setErrorMsg("Passwords don't match");
		}
	};

	// Sign up:
	const toLogIn = () => {
		navigation.navigate("LogIn");
	}

	// Render:
	return (
		<View style={styles.screenWithAppbarContainer}>
			<Appbar>
				<Appbar.Content title="Booxmarkx" />
			</Appbar>
			<View style={_styles.container}>
			{/* <View style={styles.centeredContainer}> */}
				<TextInput
					onChangeText={setMail}
					placeholder="E-mail address..."
					autoCapitalize="none"
					keyboardType="email-address"
					returnKeyType="next"
					defaultValue={mail}
					style={_styles.input}
				/>
				<TextInput
					onChangeText={setPwd}
					placeholder="Password..."
					autoCapitalize="none"
					keyboardType="default"
					secureTextEntry={true}
					returnKeyType="next"
					defaultValue={pwd}
					style={_styles.input}
				/>
				<TextInput
					onChangeText={setPwdConfirm}
					placeholder="Confirm password..."
					autoCapitalize="none"
					keyboardType="default"
					secureTextEntry={true}
					returnKeyType="go"
					onSubmitEditing={create}
					defaultValue={pwdConfirm}
					style={_styles.input}
				/>
				<Button onPress={create} mode="contained">
					Create my account
				</Button>
				<Button onPress={toLogIn} mode="text" style={{ marginTop: 20 }}>
					Go to log in screen
				</Button>

				<View>
					{ !!errorMsg && <Text>{errorMsg}</Text> }
					{ !!result && <Text>{result}</Text> }
				</View>
			</View>
		</View>
	);
}

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	input: {
		height: 40,
		width: 300,
		borderColor: '#999',
		borderWidth: 1,
		borderRadius: 2,
		marginBottom: 5,
		padding: 1,
	},
});
