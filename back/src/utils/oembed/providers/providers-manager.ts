import { IProvider } from "./provider-interface";
import { FlickrProvider } from "./flickr.provider";
import { VimeoProvider } from "./vimeo.provider.ts";

/**
 * Instanciates and orchestrates oEmbed Providers.
 */
export module ProvidersManager {

	/**
	 * List of available Providers.\
	 * _The order should only matter if 2+ Providers can process same-shape URLs..._
	 */
	const PROVIDERS = [
		new FlickrProvider(),
		new VimeoProvider(),
	];

	/**
	 * Returns the first Provider able to process `url`.
	 * @param url URL to be processed
	 */
	export function selectProviderForUrl(url: string): IProvider {
		for (const provider of PROVIDERS) {
			if (provider.canProcessUrl(url)) {
				return provider;
			}
		}
		throw new Error("No Provider can process this URL: " + url);
	}

	/**
	 * Returns the oEmbed Response for `url`.
	 * @param url URL to a media
	 * @param provider Provider to use. If missing, chooses a Provider based on the URL scheme.
	 */
	export async function getMediaInfo(url: string, provider?: IProvider) {
		if (!provider) {
			provider = selectProviderForUrl(url);
		}
		return provider.getMediaInfo(url);
	}
}