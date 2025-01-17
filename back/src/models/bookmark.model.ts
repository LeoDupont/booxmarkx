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
	@Field(type => ID)
	public _id?: string;

	@prop()
	@Field(type => ID)
	public accountId!: string;

	@prop()
	@Field({ description: "Link to the web page of the media" })
	public pageUrl!: string;

	@prop({ index: true, text: true })
	@Field()
	public title!: string;

	@prop()
	@Field()
	public authorId?: string;

	@prop()
	@Field()
	public createdAt!: Date;

	@prop()
	@Field()
	public updatedAt!: Date;

	@prop({ type: [String] })
	@Field(type => [String], { nullable: true, description: "Array of tags" })
	public tags!: string[];

	// @prop()
	// @Field(type => BookmarkType, { nullable: true, description: "Bookmark type (ex: video, image)" })
	// type!: BookmarkType;
	@prop()
	@Field({ description: "Bookmark type (ex: video, image)" })
	type!: string;

	@prop()
	@Field({ description: "Bookmark source (ex: Vimeo, Flickr)" })
	source!: string;

	// === COMMON PICTURAL MEDIA ATTRIBUTES ===

	@prop()
	@Field({ description: "Width (in pixels)" })
	public width!: number;

	@prop()
	@Field({ description: "Height (in pixels)" })
	public height!: number;

	// === VIDEO-SPECIFIC ATTRIBUTES ===

	@prop()
	@Field({ nullable: true, description: "Video duration (in seconds)" })
	public duration?: number;

	// === Thumbnail ===

	@prop()
	@Field({ nullable: true, description: "Thumbnail displayed in the Bookmarks list" })
	public thumbnailUrl?: string;

	// === Preview ===

	@prop()
	@Field({ nullable: true, description: "Direct link to the image" })
	public imageUrl?: string;
	@prop()
	@Field({ nullable: true, description: "Embed HTML code to preview the video (on Web clients)" })
	public embedHtml?: string;
	@prop()
	@Field({ nullable: true, description: "Source URL of the video, extracted from embedHtml. To preview the video (on mobile clients)" })
	public videoSourceUrl?: string;
}

/**
 * Mongoose Bookmark model.\
 * _Generated from the base `Bookmark` class._
 */
export const BookmarkModel = getModelForClass(Bookmark);
