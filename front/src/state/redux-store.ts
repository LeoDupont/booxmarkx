import { configureStore } from "@reduxjs/toolkit";
import { accountSlice, AccountStateSlice } from "../features/account/accountSlice";

export type RootState = {
	account: AccountStateSlice,
}

/**
 * Example Redux Store for authentication...
 */
export const store = configureStore({
	reducer: {
		account: accountSlice.reducer,
		// (We'll use Apollo instead for the Bookmarks part)
		// bookmarks: bookmarksSlice.reducer,
	},
});
