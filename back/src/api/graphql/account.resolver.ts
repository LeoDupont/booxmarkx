import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Config } from "../../config";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { TokensManager } from "../utils/tokens-manager";
import { GraphqlContext } from "./init-graphql";

@Resolver(Account)
export class AccountResolver {

	constructor() {}

	// =======================================================
	// == REGISTER
	// =======================================================

	@Mutation(returns => Account, { description: "To sign up to a new account" })
	register(
		@Arg('mail') mail: string,
		@Arg('pwd') pwd: string,
	) {
		return AccountsService.createAccount(mail, pwd);
	}

	// =======================================================
	// == DELETE
	// =======================================================

	@Authorized()
	@Mutation(returns => Account, { description: "To delete one's own Account. Must be authenticated." })
	delete(
		@Ctx() ctx: GraphqlContext,
	) {
		return AccountsService.deleteAccount(ctx.account._id);
	}

	// =======================================================
	// == AUTHENTICATE
	// =======================================================

	@Mutation(returns => Account, { nullable: true, description: "To log in to an existing account" })
	async authenticate(
		@Arg('mail') mail: string,
		@Arg('pwd') pwd: string,
		@Arg('long', { description: "To a get a long-lasting cookie (31 days)" }) long: boolean,
		@Ctx() ctx: GraphqlContext,
	) {
		const { token, account } = await AccountsService.authenticate(mail, pwd, long);
		TokensManager.setTokenCookie(ctx.res, token);
		return account;
	}

	// =======================================================
	// == USER INFO
	// =======================================================

	@Query(returns => [Account], { description: "To get a list of all users (dev only)" })
	async accounts() {
		// (We could develop this part if we needed admin capabilities)
		if (Config.IS_PROD) {
			throw new Error("Only in development");
		}
		return AccountsService.list();
	}

	@Authorized()
	@Query(returns => Account, { description: "To get one's own Account. Must be authenticated." })
	async account(
		@Ctx() ctx: GraphqlContext
	) {
		return ctx.account;
	}
}