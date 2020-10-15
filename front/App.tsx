import 'react-native-gesture-handler'; // must be at the very top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from './src/screens/login';
import { SignUpScreen } from './src/screens/signup';
import { BookmarksScreen } from './src/screens/bookmarks';
import { BookmarkScreen } from './src/screens/bookmark';

export type RootStackParamList = {
	Login: undefined,
	SignUp: undefined,
	Bookmarks: undefined,
	Bookmark: undefined,
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={ LoginScreen }
				/>
				<Stack.Screen
					name="SignUp"
					component={ SignUpScreen }
				/>
				<Stack.Screen
					name="Bookmarks"
					component={ BookmarksScreen }
				/>
				<Stack.Screen
					name="Bookmark"
					component={ BookmarkScreen }
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
