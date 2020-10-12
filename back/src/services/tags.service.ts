import { DocumentType } from "@typegoose/typegoose";
import { Bookmark, BookmarkModel } from "../models/bookmark.model";
import { TagWithCount } from "../models/tags.model";
import { InputCleaner } from "../utils/input-cleaner";

export module TagsService {

	// =======================================================
	// == MANAGE TAGS
	// =======================================================

	/**
	 * Sets a Bookmark's `tags` list.
	 * @param bookmarkQuery A Bookmark DTO or what is needed to query an existing Bookmark
	 * @param tags An array of tags. By default: an empty array.
	 * @returns `void`
	 * @throws If the update failed (Bookmark not found, connection problems...)
	 */
	export async function setBookmarkTags(
		bookmarkQuery: {
			/** Method 1: direct `bookmarkDTO` (won't be saved as this happens before creation). */
			bookmarkDTO?: Bookmark,
			/** Method 2: `bookmarkId` __AND__ `accountId` for query. */
			bookmarkId?: string,
			/** Method 2: `bookmarkId` __AND__ `accountId` for query. */
			accountId?: string,
		},
		tags: string[] = []
	) {
		// Clean tags:
		const cleanTags = tags.map(InputCleaner.tag);

		// Method 1: Bookmark DTO:
		if (bookmarkQuery.bookmarkDTO) {
			bookmarkQuery.bookmarkDTO.tags = cleanTags;
			return;
		}

		// Method 2: Bookmark query:
		const nMatched = await BookmarkModel.updateOne(
			{
				_id: bookmarkQuery.bookmarkId,
				accountId: bookmarkQuery.accountId,
			},
			{
				tags: cleanTags,
			}
		);

		if (nMatched < 1) {
			throw new Error("Bookmark not found (for authenticated Account):" + bookmarkQuery.bookmarkId);
		}
	}

	// =======================================================
	// == FIND
	// =======================================================

	/**
	 * Returns a list of all the Tags used in the Bookmarks of a given Account.
	 * @param accountId Bookmarks owner Account
	 */
	export async function listAccountTags(accountId: string) {
		return await BookmarkModel.aggregate<TagWithCount>([
			{
				// Spreads Bookmarks for each `tag`:
				$unwind: "$tags"
			},
			{
				// Groups and counts spreaded Bookmarks by `tags`:
				$group: {
					_id: "$tags",
					count: { $sum: 1 },
				}
			},
		]);
	}

}