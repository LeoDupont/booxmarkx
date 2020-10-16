import React, { Component } from "react";
import { Account, MutationAuthenticateArgs } from "../types/graphql-schema";
import { AccountService } from "./account.service";
import { AuthenticationService } from "./authentication.service";

export const AuthContext = React.createContext(null);

export const AuthContextProvider: React.FC<any> = (props) => {

	// === State machine ===

	type State = {
		/** If we are fetching or validating a token */
		loading: boolean,
		/** If the user just logged out (for animations) */
		didSignout: boolean,
		/** The user Account, if authenticated */
		account: Account | null,
	};
	enum ActionType { RESTORE_TOKEN, SIGN_IN, SIGN_OUT }
	type Action = {
		type: ActionType,
		account?: Account | null,
	};

	const [state, dispatch] = React.useReducer(
		(prevState: State, action: Action) => {
			console.log("[ACT] action", action);
			switch (action.type) {
				case ActionType.RESTORE_TOKEN:
					return {
						...prevState,
						loading: false,
						account: action.account,
					};
				case ActionType.SIGN_IN:
					return {
						...prevState,
						didSignout: false,
						account: action.account,
					};
				case ActionType.SIGN_OUT:
					return {
						...prevState,
						didSignout: true,
						account: null,
					};
			}
		},
		{
			loading: true,
			didSignout: false,
			account: null,
		}
	);

	// === Acts ===

	const acts = {
		restoreToken: async () => {
			// Retrieve stored token:
			const token = await AuthenticationService.retrieveToken().catch();
			console.log("[ACT] token:", token);

			// Try token:
			let account: Account;
			if (token) {
				account = await AccountService.getAccount().catch();
			}

			dispatch({ type: ActionType.RESTORE_TOKEN, account });
		},

		signIn: async (args: MutationAuthenticateArgs) => {
			const authResult = await AuthenticationService.authenticate(args);
			dispatch({ type: ActionType.SIGN_IN, account: authResult.account });
		},

		signOut: () => {
			dispatch({ type: ActionType.SIGN_OUT })
		},
	}

	// === Init ===

	React.useEffect(() => {
		const init = async () => {
			await acts.restoreToken();
		};
		init();
	});

	// === Actions ===

	const authContext = React.useMemo(
		() => ({
			restoreToken: acts.restoreToken,
			signIn: acts.signIn,
			signOut: acts.signOut,
			getState: () => state,
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			{props.children}
		</AuthContext.Provider>
	)
};
