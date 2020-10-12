import { Field, ObjectType } from "type-graphql";

/**
 * Only used as a return type for the GraphQL query `accountTags`.
 */
@ObjectType()
export class TagWithCount {
	@Field({ description: "The label of the Tag" })
	_id!: string;

	@Field({ description: "The number of Bookmarks related to this Tag." })
	count!: number;
}
