/**
 * oEmbed types.\
 * Doc : https://oembed.com/
 */
export module oEmbed {

	export enum Type {
		PHOTO = 'photo',
		VIDEO = 'video',
		LINK = 'link', // Not implemented
		RICH = 'rich', // Not implemented
	}

	export interface Response {
		type: Type;
		version: '1.0';

		title?: string;

		author_name?: string;
		author_url?: string;

		provider_name?: string;
		provider_url?: string;

		/** Suggested cache lifetime */
		cache_age?: number;

		thumbnail_url?: string;
		thumbnail_width?: number;
		thumbnail_height?: number;

		/**
		 * The HTML required to embed a video player. The HTML should have no padding or margins. Consumers may wish to load the HTML in an off-domain iframe to avoid XSS vulnerabilities.
		 */
		html: string;
	}

	export interface PhotoResponse extends Response {
		type: Type.PHOTO;

		/** Direct link to the image file */
		url: string;

		width: number;
		height: number;

		/** Link to the web page of the image */
		web_page?: string;
	}

	export interface VideoResponse extends Response {
		type: Type.VIDEO;

		width: number;
		height: number;

		/** Some Providers (like Vimeo) provide this attribute */
		duration?: number;

		thumbnail_url_with_play_button?: string;

		/** Extracted by Booxmarkx API from `html` when possible */
		videoSourceUrl?: string;
	}

	// =======================================================
	// == TYPE GUARDS
	// =======================================================

	export function isPhoto(response: Response): response is PhotoResponse {
		return response.type === Type.PHOTO;
	}

	export function isVideo(response: Response): response is VideoResponse {
		return response.type === Type.VIDEO;
	}
}
