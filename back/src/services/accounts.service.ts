import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import { Account, AccountModel, AuthResponse } from "../models/account.model";
import { InputCleaner } from "../utils/input-cleaner";
import { TokensUtils } from "../utils/tokens.utils";

/**
 * Accounts business logic (registering, authenticating, deleting...).
 */
export module AccountsService {

	// =======================================================
	// == TOKENS
	// =======================================================

	const TOKEN_DURATION = {
		/** Default token duration: 10 minutes */
		DEFAULT: '10m',
		/** Long session: 31 days */
		LONG: '31d',
	};

	export type TokenPayload = {
		/** Account ID */
		sub: string,
	};

	/**
	 * Returns an authenticating token for a given Account.
	 * @param account Account to authenticate
	 * @param longSession True to get a long-lasting token
	 * @returns An authenticating token for `account`
	 * @throws The token couldn't be signed (missing secret?)
	 */
	async function getTokenForAccount(account: Account, longSession?: boolean) {
		const payload: TokenPayload = {
			sub: account._id,
		};

		const options: jwt.SignOptions = {
			expiresIn: longSession ? TOKEN_DURATION.LONG : TOKEN_DURATION.DEFAULT,
		};

		return TokensUtils.sign(payload, Config.TOKEN_SECRET_KEY, options);
	}

	/**
	 * Verifies a token and retrieves the corresponding Account.
	 * @param token An authenticating token to verify
	 * @returns The authenticated Account
	 * @throws Missing token
	 * @throws The token couldn't be verified (expired, malformed...)
	 * @throws The token's subject claim points to a non-existing Account
	 */
	export async function getAccountFromToken(token?: string) {
		if (!token) {
			throw new Error("Missing token");
		}
		const payload = await TokensUtils.verify<TokenPayload>(token, Config.TOKEN_SECRET_KEY);
		const account = await findOneOrThrow({ _id: payload.sub });
		return account;
	}

	// =======================================================
	// == PASSWORDS
	// =======================================================

	/**
	 * Hashes a password.
	 * @param pwd Unencrypted password to hash
	 */
	async function hashPassword(pwd: string) {
		return bcrypt.hash(pwd, 10);
	}

	/**
	 * Checks if `hashedPwd` is the result of `pwd` hashed.
	 *
	 * _Note : This check can't be done by `hash(pwd) === hashedPwd` because the result of the hash is different each time._
	 *
	 * @param pwd Unencrypted password to check
	 * @param hashedPwd Hashed password to be checked against
	 * @returns `true` if `pwd` matches `hashedPwd`
	 * @throws `errorMessage` if provided and passwords don't match
	 */
	async function checkPassword(pwd: string, hashedPwd: string, errorMessage?: string) {
		const passwordsMatch = bcrypt.compare(pwd, hashedPwd);
		if (!passwordsMatch && errorMessage) {
			throw new Error(errorMessage);
		}
		return passwordsMatch;
	}

	// =======================================================
	// == REGISTERING
	// =======================================================

	/**
	 * Creates and saves an account.
	 * @param mail Account's e-mail. Must be available.
	 * @param pwd Account's password
	 * @returns The new account
	 */
	export async function createAccount(mail: string, pwd: string) {

		const cleanMail = InputCleaner.email(mail);
		const hashedPwd = await hashPassword(pwd);

		const account = new AccountModel({
			mail: cleanMail,
			pwd: hashedPwd,
			createdAt: new Date(),
		});

		return account.save();
	}

	// =======================================================
	// == AUTH
	// =======================================================

	/**
	 * Tries to authenticate a user with an existing account.
	 * @param mail Account's login (ie. e-mail)
	 * @param pwd Account's password
	 * @param longSession To get a long-lasting token
	 * @returns An authentication token
	 * @throws Account not found
	 * @throws Incorrect password
	 * @throws Token signing error
	 */
	export async function authenticate(mail: string, pwd: string, longSession?: boolean) {

		// Login guard:
		const cleanMail = InputCleaner.email(mail);
		const account = await findOneOrThrow({ mail: cleanMail },
			"Account not found for " + cleanMail
		);

		// Password guard:
		await checkPassword(pwd, account.pwd,
			"Incorrect password for " + cleanMail
		);

		// Generate token:
		const token = await getTokenForAccount(account, longSession);

		return { token, account } as AuthResponse;
	}

	// =======================================================
	// == SEARCHING
	// =======================================================

	/**
	 * Finds and returns an account or throws an error.
	 * @param query Find by _id or by mail
	 * @param errorMessage Error message to throw if no Account is found
	 * @returns A Promise of an Account matching the query
	 * @throws No Account matches the query
	 */
	export async function findOneOrThrow(
		query: { _id?: string, mail?: string },
		errorMessage: string = "Account not found"
	) {
		const account = await AccountModel.findOne(query);
		if (!account) {
			throw new Error(errorMessage);
		}
		return account;
	}

	// =======================================================
	// == ADMIN
	// =======================================================

	export async function list() {
		return AccountModel.find();
	}

	export async function deleteAccount(accountId: string) {
		return AccountModel.deleteOne({ _id: accountId });
	}

}