// import { Config } from "../../../config";
import { oEmbed } from "../oembed";
import { IProvider, ProviderDefaultHandlers } from "./provider-interface";

// const Flickr = require("flickr-sdk");

/**
 * oEmbed Provider for Flickr media URLs.\
 * Source : https://oembed.com/
 */
export class FlickrProvider implements IProvider {

	// =======================================================
	// == IProvider implementation
	// =======================================================

	NAME = "Flickr";
	API_ENDPOINT = "https://www.flickr.com/services/oembed/";

	// URL schemes capturing the photo ID with a named 'id' group:
	// (The endings "<id>[...]" take into account URL query params or additional data past the photo ID)
	URL_SCHEMES = [
		// "http(s)://*.flickr.com/photos/<author>/<id>[...]":
		/https?:\/\/.*\.flickr\.com\/photos\/.*?\/(?<id>.*?)[\/|\?]?.*/,
		// "http(s)://*.flickr.com/photos/<id>[...]":
		/https?:\/\/.*\.flickr\.com\/photos\/(?<id>.*?)[\/|\?]?.*/,
		// "http(s)://flic.kr/p/<id>[...]":
		/https?:\/\/flic\.kr\/p\/(?<id>.*?)[\/|\?]?.*/,
	];

	canProcessUrl(url: string) {
		return ProviderDefaultHandlers.canProcessUrl(url, this.URL_SCHEMES);
	}

	async getMediaInfo(url: string) {
		// Generic response getter:
		const resp = await ProviderDefaultHandlers.getMediaInfo<oEmbed.PhotoResponse>(url, this.API_ENDPOINT,
			{ format: 'json' }
		);

		// See "Additional setup" section...
		// // Get image URL(s):
		// const photoId = this.extractPhotoIdFromUrl(url);
		// console.log("PhotoId:", photoId);
		// if (photoId) {
		// 	const sizes = await this.getPhotoUrls(photoId);
		// 	console.log("[Flickr Provider] Photo URLs:", sizes);
		// }
		// else {
		// 	console.warn("[Flickr Provider] Could not extract photo ID from URL:", url);
		// }

		return resp;
	}

	// =======================================================
	// == Additional setup
	// =======================================================
	// In the end, we don't need to use Flickr API for now...
	// Keeping it in case we need it later.

	// private flickr: any;

	// constructor() {
	// 	if (Config.FLICKR_API_KEY) {
	// 		this.flickr = new Flickr(Config.FLICKR_API_KEY);
	// 	}
	// 	else {
	// 		console.warn("[Flickr Provider] No FLICKR_API_KEY key provided in environment variables. The API key is not mandatory, but brings extra features for Flickr Bookmarks.");
	// 	}
	// }

	// private extractPhotoIdFromUrl(url: string) {
	// 	console.log("Extrating ID from:", url);
	// 	for (const scheme of this.URL_SCHEMES) {
	// 		console.log("Testing expression:", scheme);
	// 		const match = url.match(scheme);
	// 		if (match?.groups?.id) {
	// 			console.log("It's a match:", match);
	// 			return match.groups.id;
	// 		}
	// 	}
	// }

	// private async getPhotoUrls(photoId: string) {
	// 	return this.flickr.photos.getSizes(photoId);
	// }
}
