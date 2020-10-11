import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

// export enum BookmarkType {
// 	VIDEO,
// 	IMAGE,
// }
// registerEnumType(BookmarkType, {
// 	name: 'BookmarkType',
// });

/**
 * Base `Bookmark` class.
 *
 * Used to generate:
 * - A Mongoose `BookmarkModel`
 * - A Type-GraphQL `BookmarkResolver`
 */
@ObjectType()
export class Bookmark {

	// === COMMON BOOKMARKS ATTRIBUTES ===

	// @prop(): not mentioned to the Mongoose model because we want to let Mongoose create an _id by itself
	@Field(type => ID, { nullable: true })
	public _id?: string;

	@prop()
	@Field(type => ID, { nullable: true })
	public accountId!: string;

	@prop({ index: true, text: true })
	@Field({ nullable: true })
	public title!: string;

	@prop()
	@Field({ nullable: true })
	public url!: string;

	@prop()
	@Field({ nullable: true })
	public authorId?: string;

	@prop()
	@Field({ nullable: true })
	public createdAt!: Date;

	@prop()
	@Field({ nullable: true })
	public updatedAt!: Date;

	@prop({ type: [String] })
	@Field(type => [String], { nullable: true, description: "Array of tags" })
	public tags!: string[];

	// @prop()
	// @Field(type => BookmarkType, { nullable: true, description: "Bookmark type (ex: video, image)" })
	// type!: BookmarkType;
	@prop()
	@Field({ nullable: true, description: "Bookmark type (ex: video, image)" })
	type!: string;

	@prop()
	@Field({ nullable: true, description: "Bookmark source (ex: Vimeo, Flickr)" })
	source!: string;

	@prop()
	@Field({ nullable: true })
	public thumbnailUrl?: string;

	@prop()
	@Field({ nullable: true })
	public embedHtml?: string;

	// === COMMON PICTURAL MEDIA ATTRIBUTES ===

	@prop()
	@Field({ nullable: true, description: "Width (in pixels)" })
	public width?: number;

	@prop()
	@Field({ nullable: true, description: "Height (in pixels)" })
	public height?: number;

	// === VIDEO-SPECIFIC ATTRIBUTES ===

	@prop()
	@Field({ nullable: true, description: "Video duration (in seconds)" })
	public duration?: number;
}

/**
 * Mongoose Bookmark model.\
 * _Generated from the base `Bookmark` class._
 */
export const BookmarkModel = getModelForClass(Bookmark);
