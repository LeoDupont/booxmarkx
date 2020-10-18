import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../features/account/LoginScreen";
import { SignUpScreen } from "../features/account/SignUpScreen";
import { SplashScreen } from "../features/account/SplashScreen";
import { useSelector } from "react-redux";
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

	const { account, loading, tryRestoring } = useSelector(selectAccount);

	console.log({ account, loading, tryRestoring })

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
