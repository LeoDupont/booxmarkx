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
	@Field(type => ID)
	public _id!: string;

	@prop({ index: true, unique: true })
	@Field()
	public mail!: string;

	@prop()
	@Field()
	public pwd!: string;

	@prop()
	@Field()
	public createdAt!: Date;
}

/**
 * Mongoose Account model.\
 * _Generated from the base `Account` class._
 */
export const AccountModel = getModelForClass(Account);

/**
 * Only used as a return type for the GraphQL query `authenticate`.
 */
@ObjectType()
export class AuthResponse {
	@Field({ description: "A token authenticating the Account" })
	token!: string;

	@Field(type => Account, { description: "The Account details" })
	account!: Account;
}