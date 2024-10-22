import { DocumentType } from "@typegoose/typegoose";
import { MongooseFilterQuery } from "mongoose";
import { Author } from "../models/author.model";
import { Bookmark, BookmarkModel } from "../models/bookmark.model";
import { InputCleaner } from "../utils/input-cleaner";
import { MiscUtils } from "../utils/misc.utils";
import { oEmbed } from "../utils/oembed/oembed";
import { ProvidersManager } from "../utils/oembed/providers/providers-manager";
import { AuthorsService } from "./authors.service";
import { TagsService } from "./tags.service";

export module BookmarksService {

	// =======================================================
	// == GET MEDIA INFO
	// =======================================================

	export async function getMediaInfo(url: string) {
		const provider = ProvidersManager.selectProviderForUrl(url);
		const mediaInfo = await ProvidersManager.getMediaInfo(url, provider);
		return { provider, mediaInfo };
	}

	// =======================================================
	// == CREATE / DELETE
	// =======================================================

	export async function createBookmark(url: string, accountId: string, metadata?: {
		title?: string,
		tags?: string[],
	}) {
		// === Get media data ===

		const { provider, mediaInfo } = await getMediaInfo(url);

		// === Create or find media Author ===

		let author: DocumentType<Author> | undefined;
		if (mediaInfo.author_name && mediaInfo.author_url) {
			author = await AuthorsService.recordAuthor(mediaInfo.author_name, mediaInfo.author_url);
		}

		// === Define media URL, thumbnail and preview ===

		const now = new Date();

		// Defaults:
		const bookmarkDTO: Bookmark = {
			accountId,
			type: mediaInfo.type,
			source: provider.NAME,

			authorId: author?._id,

			title: metadata?.title || mediaInfo.title || '???',
			createdAt: now,
			updatedAt: now,
			tags: [],

			pageUrl: url,
			thumbnailUrl: mediaInfo.thumbnail_url,
			embedHtml: mediaInfo.html,

			height: mediaInfo.height,
			width: mediaInfo.width,
		};

		if (oEmbed.isPhoto(mediaInfo)) {
			if (mediaInfo.web_page) {
				bookmarkDTO.pageUrl = mediaInfo.web_page;
			}
			bookmarkDTO.imageUrl = mediaInfo.url;
		}
		if (oEmbed.isVideo(mediaInfo)) {
			if (mediaInfo.thumbnail_url_with_play_button) {
				bookmarkDTO.thumbnailUrl = mediaInfo.thumbnail_url_with_play_button || mediaInfo.thumbnail_url;
			}
			bookmarkDTO.duration = mediaInfo.duration;
			bookmarkDTO.videoSourceUrl = mediaInfo.videoSourceUrl;
		}

		// === Set Tags ===

		await TagsService.setBookmarkTags({ bookmarkDTO }, metadata?.tags);

		// === Create Bookmark ===

		const bookmark = await BookmarkModel.create(bookmarkDTO);
		return bookmark;
	}

	export async function deleteBookmark(id: string, accountId: string) {
		return BookmarkModel.deleteOne({
			_id: id,
			accountId,
		});
	}

	// =======================================================
	// == FIND
	// =======================================================

	/**
	 * Text search :
	 * - https://docs.mongodb.com/manual/text-search/
	 * - https://docs.mongodb.com/manual/reference/operator/query/text/#op._S_text
	 */
	export async function findBookmarks(query: {
		/** Only this Account's Bookmarks */
		accountId: string,
		/** Title contains (case insensitive, supports `*` and `?` wildcards) */
		title?: string,
		/** Text search accross text indexes (see BookmarkModel) (not as flexible as RegExp for title) */
		textSearch?: string,
		/** Only with these tags */
		tags?: string[],
		/** Only from these Authors */
		authors?: string[],
		/** Only from these sources */
		sources?: string[],
		/** Only of these types */
		types?: string[],
	}) {

		// Account only:
		const mongoQuery: MongooseFilterQuery<DocumentType<Bookmark>> = {
			accountId: query.accountId,
		};

		// Text search (title):
		if (query.textSearch) {
			mongoQuery.$text = {
				$search: query.textSearch,
				$language: 'none', // no stemming nor stop words, since media titles and descriptions could be multilingual
				$caseSensitive: false,
				$diacraticSensitive: false,
			};
		}

		// Title:
		if (query.title) {
			const wildcardQueryRegexp = MiscUtils.wildcardToRegExp(query.title);
			mongoQuery.title = {
				$regex: new RegExp(wildcardQueryRegexp, 'i'),
			};
		}

		// Tags:
		if (query.tags) {
			mongoQuery.tags = { $in: query.tags };
		}

		// Authors:
		if (query.authors) {
			mongoQuery.authorId = { $in: query.authors };
		}

		// Sources:
		if (query.sources) {
			mongoQuery.source = { $in: query.sources };
		}

		// Types:
		if (query.types) {
			mongoQuery.type = { $in: query.types };
		}

		return BookmarkModel.find(mongoQuery);
	}
}