import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logIn } from "./accountSlice";
import { styles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { AccountStackParamList } from "../../navigations/account.routes";
import { StackScreenProps } from "@react-navigation/stack";

type LoginScreenProps = StackScreenProps<AccountStackParamList, 'LogIn'>;
export const LoginScreen: React.FC<LoginScreenProps> = (props) => {

	// State:
	let [mail, setMail] = useState('');
	let [pwd, setPwd] = useState('');
	let [errorMsg, setErrorMsg] = useState('');

	const dispatch = useDispatch();
	const navigation = useNavigation();

	let info = '';
	if (props.route.params?.justSignedUp) {
		info = "Your account has been created. Please sign in.";
	}

	// Auth:
	const auth = () => {
		Keyboard.dismiss();
		dispatch(logIn({ mail, pwd, long: true }));
	};

	// Sign up:
	const toSignUp = () => {
		navigation.navigate("SignUp");
	}

	// Render:
	return (
		<View style={styles.screenWithAppbarContainer}>
			<Appbar>
				<Appbar.Content title="Booxmarkx" />
			</Appbar>
			<View style={_styles.container}>
			{/* <View style={styles.centeredContainer}> */}

				<View>
					{ !!info && <Text>{info}</Text> }
					{ !!errorMsg && <Text>{errorMsg}</Text> }
				</View>

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
					returnKeyType="go"
					onSubmitEditing={auth}
					defaultValue={pwd}
					style={_styles.input}
				/>
				<Button onPress={auth} mode="contained">
					Log in
				</Button>
				<Button onPress={toSignUp} mode="text" style={{ marginTop: 20 }}>
					Create an account
				</Button>
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
		...styles.input,
		marginBottom: 5,
	},
});
