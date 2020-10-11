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
	}

	export interface PhotoResponse extends Response {
		type: Type.PHOTO;
		url: string;
		width: number;
		heigth: number;
	}

	export interface VideoResponse extends Response {
		type: Type.VIDEO;
		/**
		 * The HTML required to embed a video player. The HTML should have no padding or margins. Consumers may wish to load the HTML in an off-domain iframe to avoid XSS vulnerabilities.
		 */
		html: string;
		width: number;
		heigth: number;
	}
}
