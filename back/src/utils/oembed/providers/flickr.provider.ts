import { oEmbed } from "../oembed";
import { IProvider, ProviderDefaultHandlers } from "./provider-interface";

/**
 * oEmbed Provider for Flickr media URLs.\
 * Source : https://oembed.com/
 */
export class FlickrProvider implements IProvider {

	NAME = "Flickr";
	API_ENDPOINT = "https://www.flickr.com/services/oembed/";
	URL_SCHEMES = [
		"http://*.flickr.com/photos/*",
		"http://flic.kr/p/*",
		"https://*.flickr.com/photos/*",
		"https://flic.kr/p/*",
	];

	canProcessUrl(url: string) {
		return ProviderDefaultHandlers.canProcessUrl(url, this.URL_SCHEMES);
	}

	getMediaInfo(url: string) {
		return ProviderDefaultHandlers.getMediaInfo<oEmbed.PhotoResponse>(url, this.API_ENDPOINT,
			{ format: 'json' }
		);
	}
}