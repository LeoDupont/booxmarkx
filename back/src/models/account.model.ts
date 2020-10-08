import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * Base `Account` class.
 *
 * Used to generate:
 * - A Mongoose `AccountModel`
 * - A Type-GraphQL `AccountResolver`
 */
@ObjectType()
export class Account {
	// @prop(): not mentioned to the Mongoose model because we want to let Mongoose create an _id by itself
	@Field(type => ID, { nullable: true })
	public _id!: string;

	@prop({ index: true, unique: true })
	@Field({ nullable: true })
	public mail!: string;

	@prop()
	@Field({ nullable: true })
	public pwd!: string;

	@prop()
	@Field({ nullable: true })
	public createdAt!: Date;
}

/**
 * Mongoose Account model.\
 * _Generated from the base `Account` class._
 */
export const AccountModel = getModelForClass(Account);