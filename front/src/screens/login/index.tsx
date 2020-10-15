import { StackScreenProps } from "@react-navigation/stack";
import React, { Component, useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { PrimaryButton } from "../../components/atoms/buttons";
import { AuthenticationService } from "../../services/authentication.service";

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

	// State:
	let [mail, setMail] = useState('');
	let [pwd, setPwd] = useState('');
	let [result, setResult] = useState('');
	let [errorMsg, setErrorMsg] = useState('');

	// Auth:
	const auth = () => {
		Keyboard.dismiss();
		AuthenticationService.authenticate(mail, pwd)
			.then(data => {
				setResult(JSON.stringify(data));
				setErrorMsg('');
			})
			.catch(err => {
				setErrorMsg(err.message);
				setResult('');
			})
		;
	};

	// Render:
	return (
		<View style={styles.container}>
			<ScrollView keyboardShouldPersistTaps="handled">
				<KeyboardAvoidingView enabled>
					<TextInput
						onChangeText={setMail}
						placeholder="E-mail address..."
						autoCapitalize="none"
						keyboardType="email-address"
						returnKeyType="next"
					/>
					<TextInput
						onChangeText={setPwd}
						placeholder="Password..."
						autoCapitalize="none"
						keyboardType="default"
						secureTextEntry={true}
						returnKeyType="go"
						onSubmitEditing={auth}
					/>
					<PrimaryButton
						text="Log in"
						onPress={auth}
					/>

					<View>
						{ !!errorMsg && <Text>{errorMsg}</Text> }
						{ !!result && <Text>{result}</Text> }
					</View>

					{/* <PrimaryButton
						text="Sign Up"
						onPress={() => navigation.navigate('SignUp')}
					/>
					<PrimaryButton
						text="Bookmarks"
						onPress={() => navigation.navigate('Bookmarks')}
					/> */}
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
