import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../features/account/LoginScreen";
import { SignUpScreen } from "../features/account/SignUpScreen";
import { SplashScreen } from "../features/splashscreen";

export type AccountStackParamList = {
	SplashScreen: undefined,
	Login: undefined,
	SignUp: undefined,
};

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountRoutes = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="SplashScreen"
				component={ SplashScreen }
			/>
			<Stack.Screen
				name="Login"
				component={ LoginScreen }
			/>
			<Stack.Screen
				name="SignUp"
				component={ SignUpScreen }
			/>
		</Stack.Navigator>
	);
}
