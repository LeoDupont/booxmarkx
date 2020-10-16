import { gql } from "@apollo/client";

export module BookmarksService {
	export const queryBookmarksGql = gql`
		query {
			bookmarks {
				_id
				accountId
				title
				url
				authorId
				createdAt
				updatedAt
				tags
				type
				source
				thumbnailUrl
				embedHtml
				width
				height
				duration,
				author {
					name
				}
			}
		}
	`;
}