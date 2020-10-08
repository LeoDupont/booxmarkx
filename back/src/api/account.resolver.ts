import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Account } from "../models/account.model";
import { AccountsService } from "../services/accounts.service";

@Resolver(Account)
export class AccountResolver {

	constructor() {}

	// =======================================================
	// == REGISTER
	// =======================================================

	@Mutation(returns => Account)
	register(
		@Arg('mail') mail: string,
		@Arg('pwd') pwd: string,
	) {
		return AccountsService.createAccount(mail, pwd);
	}

	// =======================================================
	// == DELETE
	// =======================================================

	@Mutation(returns => Account)
	delete(
		@Arg('id') id: string,
	) {
		return AccountsService.deleteAccount(id);
	}

	// =======================================================
	// == AUTHENTICATE
	// =======================================================

	@Mutation(returns => Account, { nullable: true })
	authenticate(
		@Arg('mail') mail: string,
		@Arg('pwd') pwd: string,
	) {
		return AccountsService.authenticate(mail, pwd);
	}

	// =======================================================
	// == USER INFO
	// =======================================================

	@Query(returns => [Account])
	async accounts() {
		return AccountsService.list();
	}
}