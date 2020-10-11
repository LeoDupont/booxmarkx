import { oEmbed } from "../oembed";
import { IProvider, ProviderDefaultHandlers } from "./provider-interface";

/**
 * oEmbed Provider for Vimeo media URLs.\
 * Source : https://oembed.com/
 */
export class VimeoProvider implements IProvider {

	NAME = "Vimeo";
	API_ENDPOINT = "https://vimeo.com/api/oembed.json";
	URL_SCHEMES = [
		"https://vimeo.com/*",
		"https://vimeo.com/album/*/video/*",
		"https://vimeo.com/channels/*/*",
		"https://vimeo.com/groups/*/videos/*",
		"https://vimeo.com/ondemand/*/*",
		"https://player.vimeo.com/video/*",
	];

	canProcessUrl(url: string) {
		return ProviderDefaultHandlers.canProcessUrl(url, this.URL_SCHEMES);
	}

	getMediaInfo(url: string) {
		return ProviderDefaultHandlers.getMediaInfo<oEmbed.VideoResponse>(url, this.API_ENDPOINT);
	}
}