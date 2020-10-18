import { gql, makeVar, useReactiveVar } from "@apollo/client";
import { MutationCreateBookmarkArgs, MutationDeleteBookmarkArgs, QueryBookmarksArgs } from "../../types/graphql-schema";

export module BookmarksApi {

	// =======================================================
	// == QUERIES
	// =======================================================

	export const FILTERS = {
		title: makeVar(''),
	};

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
					pageUrl
					title
					authorId
					createdAt
					updatedAt
					tags
					type
					source
					width
					height
					duration
					thumbnailUrl
					imageUrl
					embedHtml
					videoSourceUrl
					author {
						name
						url
					}
				}
			}
		`,
		variables: () => ({
			title: useReactiveVar(FILTERS.title),
		}) as QueryBookmarksArgs,
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
					pageUrl
					title
					authorId
					createdAt
					updatedAt
					tags
					type
					source
					width
					height
					duration
					thumbnailUrl
					imageUrl
					embedHtml
					videoSourceUrl
					author {
						name
						url
					}
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
				deleteBookmark (id: $id)
			}
		`,
		variables: (vars: MutationDeleteBookmarkArgs) => vars,
	};

}