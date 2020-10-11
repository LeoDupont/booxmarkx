export module MiscUtils {

	export const regexpEscape = /[|\\{}()[\]^$+?.]/g;

	// =======================================================
	// == WILDCARD MATCH
	// =======================================================

	const wildcardRegexp = /\*+/g;
	const regexpEscapeButWildcard = /[|\\{}()[\]^$+?.]/g;

	/**
	 * Creates a RegExp from `pattern`:
	 * - Escapes all special characters except `*`
	 * - Converts `*` to `.*`
	 * - Wraps the pattern with `^` and `$`
	 * Source : https://gist.github.com/donmccurdy/6d073ce2c6f3951312dfa45da14a420f
	 */
	export function wildcardToRegExp(pattern: string) {

		const patternRegexp = pattern
			.replace(regexpEscapeButWildcard, '\\$&')
			.replace(wildcardRegexp, '.*');

		return '^' + patternRegexp + '$';
	}
}