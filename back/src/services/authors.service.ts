import { AuthorModel } from "../models/author.model";

export module AuthorsService {

	/**
	 * Creates or updates a record for an Author (who exists on Vimeo/Flickr/...).
	 * @param name Author's name
	 * @param url Author's URL
	 */
	export async function recordAuthor(name: string, url: string) {

		// Find and update Author with same URL:
		const existingAuthor = await findAuthorByUrl(url);
		if (existingAuthor) {
			if (existingAuthor.name !== name) {
				existingAuthor.name = name;
				return existingAuthor.save();
			}
			return existingAuthor;
		}

		// Author not found => create one:
		const author = await AuthorModel.create({
			name,
			url,
		});
		return author;
	}

	export async function findAuthorByUrl(url: string) {
		return AuthorModel.findOne({ url });
	}

}