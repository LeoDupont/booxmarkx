import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { TagWithCount } from "../../models/tags.model";
import { TagsService } from "../../services/tags.service";
import { GraphqlContext } from "./init-graphql";

@Resolver(TagWithCount)
export class TagResolver {

	constructor() {}

	// =======================================================
	// == ACCOUNT'S TAGS
	// =======================================================

	@Authorized()
	@Query(returns => [TagWithCount], { description: "Lists all the tags used in an Account's Bookmarks. Must be authenticated." })
	async accountTags(
		@Ctx() ctx: GraphqlContext
	) {
		return TagsService.listAccountTags(ctx.account._id);
	}
}