import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../../config";

export module TokensManager {

	const TOKEN_COOKIE_NAME = "boox-tk";

	/**
	 * Sets a cookie with a token and a corresponding expiration date.
	 * @param res Express Response
	 * @param token Token
	 */
	export function setTokenCookie(res: Response, token: string) {

		// === Find token expiration date ===

		const payload = jwt.decode(token, { json: true });
		if (!payload) {
			throw new Error("Unreadable token");
		}

		// Convert expiration time (in seconds):
		const expS = Number(payload.exp);
		const expMs = expS * 1000;
		const expDate = new Date(expMs);

		// === Set cookie in response headers ===

		res.cookie(TOKEN_COOKIE_NAME, token, {
			expires: expDate,
			httpOnly: true,
			secure: Config.IS_PROD,
		});
	}

	/**
	 * Reads the token cookie, if exists.
	 * @param req Express Request
	 * @param errorMessage If provided, will throw this message
	 * @returns The token from the cookies
	 * @throws `errorMessage` if there is not token cookie and a message is provided
	 */
	export function getTokenCookie(req: Request, errorMessage?: string) {
		const token = req.cookies[TOKEN_COOKIE_NAME];
		if (!token && errorMessage) {
			throw new Error(errorMessage);
		}
		return token;
	}

}