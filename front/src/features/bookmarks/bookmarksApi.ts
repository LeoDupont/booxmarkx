import { gql } from "@apollo/client";
import { MutationCreateBookmarkArgs, MutationDeleteBookmarkArgs, QueryBookmarksArgs } from "../../types/graphql-schema";

export module BookmarksApi {

	// =======================================================
	// == QUERIES
	// =======================================================

	/**
	 * GraphQL query to fetch a list of Bookmarks.
	 */
	export const BOOKMARKS = {
		query: gql`
			query (
				$title: String,
				$textSearch: String,
				$tags: [String!],
				$authors: [String!],
				$sources: [String!],
				$types: [String!],
			) {
				bookmarks (
					title: $title,
					textSearch: $textSearch,
					tags: $tags,
					authors: $authors,
					sources: $sources,
					types: $types,
				) {
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
		`,
		variables: (vars: QueryBookmarksArgs) => vars,
	};

	// =======================================================
	// == MUTATIONS
	// =======================================================

	/**
	 * GraphQL query to fetch a list of Bookmarks.
	 */
	export const CREATE = {
		mutation: gql`
			mutation (
				$url: String!,
				$tags: [String!]
			) {
				createBookmark (url: $url, tags: $tags) {
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
					duration
				}
			}
		`,
		variables: (vars: MutationCreateBookmarkArgs) => vars,
	};

	/**
	 * GraphQL query to fetch a list of Bookmarks.
	 */
	export const DELETE = {
		mutation: gql`
			mutation ($id: String!) {
				deleteBookmark (id: $id) {
					_id
				}
			}
		`,
		variables: (vars: MutationDeleteBookmarkArgs) => vars,
	};

}