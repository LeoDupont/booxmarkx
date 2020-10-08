import bcrypt from "bcrypt";
import { AccountModel } from "../models/account.model";
import { InputCleaner } from "../utils/input-cleaner";

/**
 * Accounts business logic (registering, authenticating, deleting...).
 */
export module AccountsService {

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
	 */
	async function checkPassword(pwd: string, hashedPwd: string) {
		return bcrypt.compare(pwd, hashedPwd);
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
	 * @returns (WIP)
	 * @throws `"Account not found"`
	 * @throws `"Incorrect password"`
	 */
	export async function authenticate(mail: string, pwd: string) {

		const cleanMail = InputCleaner.email(mail);

		const account = await AccountModel.findOne({
			mail: cleanMail,
		});
		if (!account) {
			throw new Error("Account not found for " + cleanMail);
		}

		const pwdOk = await checkPassword(pwd, account.pwd);
		if (!pwdOk) {
			throw new Error("Incorrect password for " + cleanMail);
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