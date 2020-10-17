import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  /** To get a list of all users (dev only) */
  accounts: Array<Account>;
  /** To get one's own Account. Must be authenticated. */
  account: Account;
  /** To get a list of an authenticated user's Bookmarks. Filters available. */
  bookmarks: Array<Bookmark>;
  /** To get an Author */
  author: Array<Author>;
  /** Lists all the Authors related to an Account's Bookmarks. Must be authenticated. */
  knownAuthors: Array<AuthorWithCount>;
  /** Lists all the Authors registered by all Accounts (for suggestions?) */
  allAuthors: Array<Author>;
  /** Lists all the tags used in an Account's Bookmarks. Must be authenticated. */
  accountTags: Array<TagWithCount>;
};


export type QueryBookmarksArgs = {
  types?: Maybe<Array<Scalars['String']>>;
  sources?: Maybe<Array<Scalars['String']>>;
  authors?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  textSearch?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type QueryAuthorArgs = {
  id: Scalars['String'];
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ID'];
  mail: Scalars['String'];
  pwd: Scalars['String'];
  createdAt: Scalars['DateTime'];
};


export type Bookmark = {
  __typename?: 'Bookmark';
  _id: Scalars['ID'];
  accountId: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
  authorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** Array of tags */
  tags?: Maybe<Array<Scalars['String']>>;
  /** Bookmark type (ex: video, image) */
  type: Scalars['String'];
  /** Bookmark source (ex: Vimeo, Flickr) */
  source: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  embedHtml?: Maybe<Scalars['String']>;
  /** Width (in pixels) */
  width?: Maybe<Scalars['Float']>;
  /** Height (in pixels) */
  height?: Maybe<Scalars['Float']>;
  /** Video duration (in seconds) */
  duration?: Maybe<Scalars['Float']>;
  /** Finds the Author related to a Bookmark. Must be authenticated. */
  author?: Maybe<Author>;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type AuthorWithCount = {
  __typename?: 'AuthorWithCount';
  author: Author;
  count: Scalars['Float'];
};

export type TagWithCount = {
  __typename?: 'TagWithCount';
  /** The label of the Tag */
  _id: Scalars['String'];
  /** The number of Bookmarks related to this Tag. */
  count: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** To sign up to a new account */
  registerAccount: Account;
  /** To delete one's own Account. Must be authenticated. */
  deleteAccount: Account;
  /** To log in to an existing account */
  authenticate?: Maybe<AuthResponse>;
  /** To create a new Bookmark. Must be authenticated. */
  createBookmark: Bookmark;
  /** To set the tags of an existing Bookmark. Must be authenticated. */
  setTags: Scalars['Boolean'];
  /** To delete an existing Bookmark. Must be authenticated. */
  deleteBookmark: Bookmark;
};


export type MutationRegisterAccountArgs = {
  pwd: Scalars['String'];
  mail: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  long: Scalars['Boolean'];
  pwd: Scalars['String'];
  mail: Scalars['String'];
};


export type MutationCreateBookmarkArgs = {
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};


export type MutationSetTagsArgs = {
  tags: Array<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeleteBookmarkArgs = {
  id: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  /** A token authenticating the Account */
  token: Scalars['String'];
  /** The Account details */
  account: Account;
};
