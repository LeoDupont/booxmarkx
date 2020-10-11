import { AuthChecker } from "type-graphql"
import { GraphqlContext } from "./init-graphql";

/**
 * GraphQL `authChecker`: run before queries and mutations decorated by `@Authorized`.
 *
 * If the GraphQL `context` has an `account` property, it means the `auth` middleware successfully found an authenticated Account.
 * If not, the response status is set to 401.
 *
 * @param param0 GraphQL arguments passed to its authChecker function (`context` is important)
 * @param roles Arguments passed to the `@Authorized()` decorator
 */
export const authChecker: AuthChecker<GraphqlContext> = (
	{ root, args, context, info }, roles
) => {
	const authorized = typeof context.account !== 'undefined';

	if (!authorized) {
		context.res.status(401);
	}

	return authorized;
}