import { configureStore } from "@reduxjs/toolkit";
import { accountSlice, AccountStateSlice } from "../features/account/accountSlice";
// import { bookmarksSlice, BookmarkStateSlice } from "../features/bookmarks/bookmarksSlice";

export type RootState = {
	account: AccountStateSlice,
	// bookmarks: BookmarkStateSlice,
}

/**
 * Example Redux Store for authentication...
 */
export const store = configureStore({
	reducer: {
		account: accountSlice.reducer,
		// bookmarks: bookmarksSlice.reducer,
	},
});
