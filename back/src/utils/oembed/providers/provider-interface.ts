import axios from "axios";
import { InputCleaner } from "../../input-cleaner";
import { MiscUtils } from "../../misc.utils";
import { oEmbed } from "../oembed";

/**
 * Defines what a Provider should implement.
 */
export interface IProvider {

	NAME: string;
	API_ENDPOINT: string;
	URL_SCHEMES: string[];

	/**
	 * The Provider must be able to tell wether it can process a given media URL.
	 */
	canProcessUrl: (url: string) => boolean;

	/**
	 * Returns the oEmbed details of the media.
	 */
	getMediaInfo: (url: string) => Promise<oEmbed.Response>;
}

/**
 * Default handler methods for Providers.\
 * _Providers can use them directly or implement their own handlers._
 */
export module ProviderDefaultHandlers {

	/**
	 * Checks `url` against `urlSchemes`, taking every `*` as a wildcard.
	 * @returns `true` if any of the schemes matches with `url`.
	 */
	export function canProcessUrl(url: string, urlSchemes: string[]) {

		const cleanUrl = InputCleaner.url(url);

		for (const scheme of urlSchemes) {
			const wildcardRegexp = MiscUtils.wildcardToRegExp(scheme);
			if (cleanUrl.match(wildcardRegexp)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Queries a Provider's oEmbed API endpoint to fetch media metadata.\
	 * _If possible, Providers should provide a more precise type for `T`._
	 * @param url Media URL
	 * @param apiEndpoint The Provider's oEmbed API endpoint
	 */
	export async function getMediaInfo<T extends oEmbed.Response>(
		url: string,
		apiEndpoint: string,
		extraParams?: any,
	) {

		const cleanUrl = InputCleaner.url(url);
		const params = Object.assign({},
			{ url: cleanUrl },
			extraParams
		);

		const response = await axios.get<T>(
			apiEndpoint, { params }
		);

		return response.data;
	}
}