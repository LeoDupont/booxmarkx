import jwt from "jsonwebtoken";

export module TokensUtils {

	/**
	 * `jwt.sign` wrapped to return a Promise.
	 */
	export async function sign(payload: string | object | Buffer, secret: jwt.Secret, options: jwt.SignOptions) {
		return new Promise<string>((resolve, reject) => {
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					return reject(err);
				}
				resolve(token);
			});
		});
	}

	/**
	 * `jwt.verify`  wrapped to return a Promise.
	 */
	export async function verify<T extends object>(token: string, secret: string) {
		return new Promise<T>((resolve, reject) => {
			jwt.verify(token, secret, (err, payload) => {
				if (err) {
					return reject(err);
				}
				resolve(payload as T);
			});
		});
	}

}