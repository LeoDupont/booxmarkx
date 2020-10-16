import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../navigations";
import { PrimaryButton } from "../../components/atoms/buttons";
import { AuthContext } from "../../services/auth-context.provider";

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

	// State:
	let [mail, setMail] = useState('leo.dpt@gmail.com');
	let [pwd, setPwd] = useState('azerty');
	let [result, setResult] = useState('');
	let [errorMsg, setErrorMsg] = useState('');

	const { signIn } = React.useContext(AuthContext);

	// Auth:
	const auth = async () => {
		Keyboard.dismiss();
		await signIn({ mail, pwd, long: true });
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
						defaultValue={mail}
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
