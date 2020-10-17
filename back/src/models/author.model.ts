import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * Base `Author` class.
 *
 * Used to generate:
 * - A Mongoose `AuthorModel`
 * - A Type-GraphQL `AuthorResolver`
 */
@ObjectType()
export class Author {
	// @prop(): not mentioned to the Mongoose model because we want to let Mongoose create an _id by itself
	@Field(type => ID)
	public _id?: string;

	@prop({ index: true })
	@Field()
	public name!: string;

	@prop({ index: true, unique: true })
	@Field()
	public url!: string;
}

@ObjectType()
export class AuthorWithCount {
	@Field(type => Author)
	public author!: Author;

	@Field()
	public count!: number;
}

/**
 * Mongoose Author model.\
 * _Generated from the base `Author` class._
 */
export const AuthorModel = getModelForClass(Author);
