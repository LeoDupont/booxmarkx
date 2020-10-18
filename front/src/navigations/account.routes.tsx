import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { LoginScreen } from "../features/account/LoginScreen";
import { SignUpScreen } from "../features/account/SignUpScreen";
import { SplashScreen } from "../features/account/SplashScreen";
import { selectAccount } from "../features/account/accountSlice";

export type AccountStackParamList = {
	SplashScreen: undefined,
	LogIn: {
		justSignedUp?: boolean,
	},
	SignUp: undefined,
};

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountRoutes = () => {

	const { tryRestoring } = useSelector(selectAccount);

	return (
		<Stack.Navigator
			headerMode="none"
		>
			<Stack.Screen
				name="SplashScreen"
				component={ tryRestoring ? SplashScreen : LoginScreen }
				options={{ title: "Booxmarkx" }}
			/>
			<Stack.Screen
				name="LogIn"
				component={ LoginScreen }
			/>
			<Stack.Screen
				name="SignUp"
				component={ SignUpScreen }
			/>
		</Stack.Navigator>
	);
}
