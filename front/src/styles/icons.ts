import { Platform } from "react-native";

export const ICONS = {

	SEARCH: 'magnify',
	FILTER: 'filter',
	OPTIONS: Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical',

};
