import { oEmbed } from "../oembed";
import { IProvider, ProviderDefaultHandlers } from "./provider-interface";

/**
 * oEmbed Provider for Vimeo media URLs.\
 * Source : https://oembed.com/
 */
export class VimeoProvider implements IProvider {

	/**
	 * Used to extract the direct video file URL from the `html` field.
	 */
	private videoFileUrlRegex = /src=\"(.*?)\"/;

	NAME = "Vimeo";
	API_ENDPOINT = "https://vimeo.com/api/oembed.json";
	URL_SCHEMES = [
		// "https://vimeo.com/album/*/video/*":
		/https:\/\/vimeo\.com\/album\/(.*)\/video\/(.*)/,
		// "https://vimeo.com/groups/*/videos/*":
		/https:\/\/vimeo\.com\/groups\/(.*)\/video\/(.*)/,
		// "https://vimeo.com/channels/*/*":
		/https:\/\/vimeo\.com\/channels\/(.*)\/(.*)/,
		// "https://vimeo.com/ondemand/*/*":
		/https:\/\/vimeo\.com\/ondemand\/(.*)\/(.*)/,
		// "https://vimeo.com/*":
		/https:\/\/vimeo\.com\/(.*)/,
		// "https://player.vimeo.com/video/*":
		/https:\/\/player\.vimeo\.com\/video\/(.*)/,
	];

	canProcessUrl(url: string) {
		return ProviderDefaultHandlers.canProcessUrl(url, this.URL_SCHEMES);
	}

	async getMediaInfo(url: string) {
		// Generic response getter:
		const videoResponse = await ProviderDefaultHandlers.getMediaInfo<oEmbed.VideoResponse>(url, this.API_ENDPOINT);

		// Extract iframe source URL:
		const match = videoResponse.html?.match(this.videoFileUrlRegex);
		if (match) {
			videoResponse.videoSourceUrl = match[1];
		}

		return videoResponse;
	}
}