import { Arg, Authorized, Ctx, FieldResolver, Query, Resolver } from "type-graphql";
import { Author, AuthorModel } from "../../models/author.model";
import { GraphqlContext } from "./init-graphql";

@Resolver(Author)
export class AuthorResolver {

	constructor() {}

	// =======================================================
	// == QUERY AUTHORS
	// =======================================================

	@Query(returns => [Author], { description: "To get a list of an authenticated user's Bookmarks. Filters available." })
	async author(
		@Ctx() ctx: GraphqlContext,
		@Arg('id') id: string,
	) {
		return AuthorModel.findById(id);
	}

	@Query(returns => [Author], { description: "To get a list of an authenticated user's Bookmarks. Filters available." })
	async authors(
		@Ctx() ctx: GraphqlContext,
	) {
		return AuthorModel.find();
	}

}