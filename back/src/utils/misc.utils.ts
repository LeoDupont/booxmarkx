export module MiscUtils {

	export const regexpEscape = /[|\\{}()[\]^$+?.]/g;

	// =======================================================
	// == WILDCARD MATCH
	// =======================================================

	const singleWildcardRegexp = /\?+/g;
	const wildcardRegexp = /\*+/g;

	/** Escapes special RegExp characters, except `*` and `?` */
	const regexpEscapeButWildcards = /[|\\{}()[\]^$+.]/g;

	/**
	 * Creates a RegExp from `pattern`:
	 * - Escapes all special characters except `*` and `?`
	 * - Converts `*` to `.*` to match several characters
	 * - Converts `*` to `.{1}` to match a single character
	 * - Wraps the pattern with `^` and `$`
	 * Source : https://gist.github.com/donmccurdy/6d073ce2c6f3951312dfa45da14a420f
	 */
	export function wildcardToRegExp(pattern: string, exact?: boolean) {

		let patternRegexp = pattern
			.replace(regexpEscapeButWildcards, '\\$&')
			.replace(wildcardRegexp, '.*')
			.replace(singleWildcardRegexp, '.{1}');

		if (exact) {
			patternRegexp = '^' + patternRegexp + '$';
		}

		return patternRegexp;
	}
}