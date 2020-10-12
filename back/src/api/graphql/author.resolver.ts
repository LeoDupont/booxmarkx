import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Author, AuthorModel, AuthorWithCount } from "../../models/author.model";
import { AuthorsService } from "../../services/authors.service";
import { GraphqlContext } from "./init-graphql";

@Resolver(Author)
export class AuthorResolver {

	constructor() {}

	// =======================================================
	// == QUERY AUTHORS
	// =======================================================

	@Query(returns => [Author], { description: "To get an Author" })
	async author(
		@Arg('id') id: string,
	) {
		return AuthorModel.findById(id);
	}

	@Authorized()
	@Query(returns => [AuthorWithCount], { description: "Lists all the Authors related to an Account's Bookmarks. Must be authenticated." })
	async knownAuthors(
		@Ctx() ctx: GraphqlContext,
	) {
		return AuthorsService.getAuthorsKnownByAccount(ctx.account._id);
	}

	@Query(returns => [Author], { description: "Lists all the Authors registered by all Accounts (for suggestions?)" })
	async allAuthors() {
		return AuthorModel.find();
	}

}