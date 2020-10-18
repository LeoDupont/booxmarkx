import { Platform } from "react-native";

export const ICONS = {

	SEARCH: 'magnify',
	FILTER: 'filter',
	CLOSE: 'close',
	LOGOUT: 'logout',
	ADD: 'plus',
	DELETE: 'delete',
	OPTIONS: Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical',

};
