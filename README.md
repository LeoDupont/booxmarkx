# Booxmarkx
[Assessment project] Flickr and Vimeo bookmarks manager.

## Stack

- Back-end:
	- Server: [Node](https://nodejs.org), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
	- API: [GraphQL](https://graphql.org/), [TypeGraphQL](https://typegraphql.com/), [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
	- Database: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [Typegoose](https://typegoose.github.io/typegoose/)
	- Testing: [Jest](https://jestjs.io/)

- Front-end:
	- Tooling: [Expo](https://expo.io/)
	- Frameworks: [React](https://reactjs.org/), [React Native](https://reactnative.dev/), [React Navigation](https://reactnavigation.org/)
	- State management: [Redux](https://redux.js.org/), [Apollo Client for React](https://www.apollographql.com/docs/react/)
	- UI: [React Native Paper](https://callstack.github.io/react-native-paper/index.html)

# Installation

> For debugging purposes, this is the setup used during development:
> - MongoDB version: 4.4.1
> - Node version: 14.13.1
> - TypeScript version: 4.0.3

## Node

* You need to have Node installed: https://nodejs.org/en/

## Source code

* Clone the repo in a local directory:
	```bash
	git clone https://github.com/LeoDupont/booxmarkx.git
	cd booxmarkx
	```

## Database

You need to provide a __MongoDB__ database URI, either to the `.env` file, or as a `BOOXMARKX_MONGODB_URI` environment variable.

If you don't have a MongoDB database ready, here are two ways to get one:

1. [Get a free, personal, remote MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas)

2. __Or__ setup a local database:
	1. [Install MongoDB Community](https://docs.mongodb.com/manual/administration/install-community/)
	2. Start up a local database:
		```bash
		cd back
		mkdir db
		npm run db
		```
		Your new MongoDB URI is: `mongodb://localhost:27017/`

## API

> By default, the API will listen on port `8080`, but you can override this with the `BOOXMARKX_API_PORT` environment variable (or in the `.env` file).

* Create a new file named `.env`, taking the `.env-sample` file as a model:
	```bash
	cd back
	cp .env-sample .env
	```

* Fill the `.env` file with missing info, if any.

* Install, build and start up the API:
	```bash
	cd back
	npm install
	npm run start
	```

The API now listens on http://localhost:8080

## Front-end

1. Similarly to the back-end, create a .env file and fill it with missing info:
	```bash
	cd front
	cp .env-sample .env
	```

2.
	- You can directly serve the front-end with Expo:
	```bash
	cd front
	npx expo start
	```
	It will open the Expo dashboard, from where you'll be able to either "Run in web browser" or on your Android/iOS device/emulator/simulator.

	- __Or__ you can [build and serve](https://docs.expo.io/distribution/publishing-websites/) the front-end for the web:
	```bash
	cd front
	npx expo build:web
	npx serve web-build
	```
	You can now reach the front-end on http://localhost:5000
