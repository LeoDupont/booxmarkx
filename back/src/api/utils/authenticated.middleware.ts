import { Request, Response, NextFunction } from "express";
import { AccountsService } from "../../services/accounts.service";
import { TokensManager } from "./tokens-manager";

/**
 * Reads the token cookie from the Request and retrieves the corresponding Account:
 * - If the authentication is successful: the Account is set in `req.app.locals.account`.
 * - If the authentication fails AND was not `optional`, a 401 Unauthorized status is sent.
 * @param optional `true` to not send an error if unauthenticated (useful for GraphQL `authChecker`)
 */
export function auth(optional: boolean = false) {
	return async (req: Request, res: Response, next: NextFunction) => {

		const token = TokensManager.getTokenCookie(req);

		try {
			const account = await AccountsService.getAccountFromToken(token);

			// Save account in `req.app.locals`:
			req.app.locals.account = account;

		} catch (err) {
			if (!optional) {
				// Invalid token: Unauthorized
				console.error(err);
				return res.sendStatus(401);
			}
		}

		next();
	};
}