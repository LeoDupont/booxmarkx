import { DocumentType } from "@typegoose/typegoose";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { Author, AuthorModel } from "../../models/author.model";
import { Bookmark } from "../../models/bookmark.model";
import { BookmarksService } from "../../services/bookmarks.service";
import { GraphqlContext } from "./init-graphql";

@Resolver(Bookmark)
export class BookmarkResolver {

	constructor() {}

	// =======================================================
	// == CREATE
	// =======================================================

	@Authorized()
	@Mutation(returns => Bookmark, { description: "To create a new Bookmark" })
	createBookmark(
		@Ctx() ctx: GraphqlContext,
		@Arg('url') url: string,
		@Arg('title', { nullable: true }) title?: string,
		@Arg('tags', type => [String], { nullable: true }) tags?: string[],
	) {
		return BookmarksService.createBookmark(url, ctx.account._id, { title, tags });
	}

	// =======================================================
	// == DELETE
	// =======================================================

	@Authorized()
	@Mutation(returns => Bookmark, { description: "To delete an existing Bookmark" })
	deleteBookmark(
		@Ctx() ctx: GraphqlContext,
		@Arg('id') id: string,
	) {
		return BookmarksService.deleteBookmark(id, ctx.account._id);
	}

	// =======================================================
	// == QUERY BOOKMARKS
	// =======================================================

	@Query(returns => [Bookmark], { description: "To get a list of an authenticated user's Bookmarks. Filters available." })
	async bookmarks(
		@Ctx() ctx: GraphqlContext,
		@Arg('title', { nullable: true }) title?: string,
		@Arg('textSearch', { nullable: true }) textSearch?: string,
		@Arg('tags', type => [String], { nullable: true }) tags?: string[],
		@Arg('authors', type => [String], { nullable: true }) authors?: string[],
		@Arg('sources', type => [String], { nullable: true }) sources?: string[],
		@Arg('types', type => [String], { nullable: true }) types?: string[],
	) {
		return BookmarksService.findBookmarks({
			accountId: ctx.account._id,
			title,
			textSearch,
			tags,
			authors,
			sources,
			types,
		});
	}

	// =======================================================
	// == RELATED AUTHORS
	// =======================================================

	@Authorized()
	@FieldResolver(returns => Author, { nullable: true })
	async author(
		@Root() bookmark: { _doc: Bookmark },
	) {
		const author = await AuthorModel.findById(bookmark._doc.authorId);
		return author;
	}

}