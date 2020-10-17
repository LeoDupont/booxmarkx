import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountService } from "../../services/account.service";
import { RootState } from "../../store";
import { Account, MutationAuthenticateArgs } from "../../types/graphql-schema";
import { AuthenticationService } from "./auth-service";

export type AccountStateSlice = {
	account: Account | undefined,
	loading: boolean,
};

/**
 * Authenticates a user and saves their Account token locally.
 */
export const logIn = createAsyncThunk(
	'account/logIn',
	async (args: MutationAuthenticateArgs) => {
		console.log("account/login...");
		const resp = await AuthenticationService.authenticate(args);
		return resp?.account;
	}
);

/**
 * Retrieves the user's token and use it to get their Account.
 */
export const restoreToken = createAsyncThunk(
	'account/restoreToken',
	async () => {
		console.log("account/restoreToken...");
		// Retrieve token:
		const token = await AuthenticationService.retrieveToken().catch();
		if (!token) {
			return undefined;
		}
		// Use token:
		const account = await AccountService.getAccount().catch();
		return account;
	}
);

export const accountSlice = createSlice({
	name: 'account',
	initialState: <AccountStateSlice> {
		account: undefined,
		loading: true,
	},
	reducers: {
		// setAccount: (state, action: PayloadAction<Account | null>) => {
		// 	state.account = action.payload;
		// 	state.loading = false;
		// }
	},
	extraReducers: builder => {
		// account/logIn:
		builder.addCase(logIn.pending, (state, action) => {
			console.log("account/login/pending");
			state.loading = true;
		});
		builder.addCase(logIn.fulfilled, (state, action) => {
			console.log("account/login/fulfilled");
			state.account = action.payload;
			state.loading = false;
		});
		builder.addCase(logIn.rejected, (state, action) => {
			console.log("account/login/rejected");
			state.account = undefined;
			state.loading = false;
		});

		// account/restoreToken:
		builder.addCase(restoreToken.pending, (state, action) => {
			console.log("account/restoreToken/pending");
			state.loading = true;
		});
		builder.addCase(restoreToken.fulfilled, (state, action) => {
			console.log("account/restoreToken/fulfilled");
			state.account = action.payload;
			state.loading = false;
		});
		builder.addCase(restoreToken.rejected, (state, action) => {
			console.log("account/restoreToken/rejected");
			state.account = undefined;
			state.loading = false;
		});
	}
});

// export const { setAccount } = accountSlice.actions;

// export const login = (args: MutationAuthenticateArgs) => {
// 	return async (dispatch, getState) => {
// 		const resp = await AuthenticationService.authenticate(args);
// 		dispatch(setAccount(resp?.account!));
// 	};
// };


export const selectAccount = (state: RootState) => state.account;
