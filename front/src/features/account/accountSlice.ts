import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountService } from "./account-service";
import { RootState } from "../../state/redux-store";
import { Account, MutationAuthenticateArgs, MutationCreateBookmarkArgs, MutationRegisterAccountArgs } from "../../types/graphql-schema";
import { AuthenticationService } from "./auth-service";

export type AccountStateSlice = {
	account: Account | undefined,
	loading: boolean,
	tryRestoring: boolean,
};

export const selectAccount = (state: RootState) => state.account;

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

// /**
//  * Authenticates a user and saves their Account token locally.
//  */
// export const signUp = createAsyncThunk(
// 	'account/signUp',
// 	async (args: MutationRegisterAccountArgs) => {
// 		console.log("account/signUp...");
// 		const resp = await AccountService.createAccount(args);
// 		return resp;
// 	}
// );

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

export const logOut = createAsyncThunk(
	'account/logOut',
	async () => {
		console.log("account/logOut...");
		await AuthenticationService.removeToken();
		return undefined;
	}
);

export const accountSlice = createSlice({
	name: 'account',
	initialState: <AccountStateSlice> {
		account: undefined,
		loading: false,
		tryRestoring: true,
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
			console.log("account/logIn/pending");
			state.loading = true;
		});
		builder.addCase(logIn.fulfilled, (state, action) => {
			console.log("account/logIn/fulfilled");
			state.account = action.payload;
			state.loading = false;
		});
		builder.addCase(logIn.rejected, (state, action) => {
			console.log("account/logIn/rejected");
			state.account = undefined;
			state.loading = false;
		});

		// // account/signUp:
		// builder.addCase(signUp.pending, (state, action) => {
		// 	console.log("account/signUp/pending");
		// 	state.loading = true;
		// });
		// builder.addCase(signUp.fulfilled, (state, action) => {
		// 	console.log("account/signUp/fulfilled");
		// 	state.account = action.payload;
		// 	state.loading = false;
		// });
		// builder.addCase(signUp.rejected, (state, action) => {
		// 	console.log("account/signUp/rejected");
		// 	state.account = undefined;
		// 	state.loading = false;
		// });

		// account/restoreToken:
		builder.addCase(restoreToken.pending, (state, action) => {
			console.log("account/restoreToken/pending");
			state.loading = true;
		});
		builder.addCase(restoreToken.fulfilled, (state, action) => {
			console.log("account/restoreToken/fulfilled");
			state.account = action.payload;
			state.loading = false;
			state.tryRestoring = false;
		});
		builder.addCase(restoreToken.rejected, (state, action) => {
			console.log("account/restoreToken/rejected");
			state.account = undefined;
			state.loading = false;
			state.tryRestoring = false;
		});

		// account/logOut:
		builder.addCase(logOut.pending, (state, action) => {
			console.log("account/logOut/pending");
			state.loading = true;
		});
		builder.addCase(logOut.fulfilled, (state, action) => {
			console.log("account/logOut/fulfilled");
			state.account = undefined;
			state.loading = false;
		});
		builder.addCase(logOut.rejected, (state, action) => {
			console.log("account/logOut/rejected");
			state.account = undefined;
			state.loading = false;
		});
	}
});

