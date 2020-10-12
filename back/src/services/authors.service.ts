import { mongoose } from "@typegoose/typegoose";
import { AuthorModel, AuthorWithCount } from "../models/author.model";
import { BookmarkModel } from "../models/bookmark.model";

export module AuthorsService {

	// =======================================================
	// == CREATE
	// =======================================================

	/**
	 * Creates or updates a record for an Author (who exists on Vimeo/Flickr/...).
	 * @param name Author's name
	 * @param url Author's URL
	 */
	export async function recordAuthor(name: string, url: string) {

		// Find and update Author with same URL:
		const existingAuthor = await findAuthorByUrl(url);
		if (existingAuthor) {
			if (existingAuthor.name !== name) {
				existingAuthor.name = name;
				return existingAuthor.save();
			}
			return existingAuthor;
		}

		// Author not found => create one:
		const author = await AuthorModel.create({
			name,
			url,
		});
		return author;
	}

	// =======================================================
	// == FIND
	// =======================================================

	export async function findAuthorByUrl(url: string) {
		return AuthorModel.findOne({ url });
	}

	/**
	 * Returns a list of all the Authors related to at least one of the Account's Bookmarks.
	 * @param accountId Bookmarks owner Account
	 */
	export async function getAuthorsKnownByAccount(accountId: string) {
		const results = await BookmarkModel.aggregate([
			{
				// Groups and counts Bookmarks by `authorId`:
				$group: {
					_id: "$authorId",
					count: { $sum: 1 },
				}
			},
			{
				// Projects the string `_id` to an ObjectId `authorObjectId`:
				// (because $lookup won't work if we compare a string to an ObjectId)
				$project: {
					count: 1,
					authorObjectId: { $toObjectId: "$_id" },
				}
			},
			{
				// Looks up the Author for each, distinct result:
				$lookup: {
					from: AuthorModel.collection.name,
					localField: 'authorObjectId',
					foreignField: '_id',
					as: 'authors', // always returns an array, but we can only have one Author per Bookmark
				}
			},
		]);

		return results.map(res => ({
			count: res.count,
			author: res.authors?.length > 0 ? res.authors[0] : null,
		}) as AuthorWithCount);
	}

}