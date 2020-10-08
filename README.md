# booxmarkx
[Assessment project] Flickr and Vimeo bookmarks manager

# Installation

For debugging purposes, this is the setup used during development:
- MongoDB version: 4.4.1
- Node version: 14.4.0
- TypeScript version: 4.0.3

## Node

You need to have Node installed: https://nodejs.org/en/

## Source code

Clone the repo in a local directory:
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
		Your new MongoDB URI is: `mongodb://localhost:27017/`.

## API

> By default, the API will listen on port `8080`, but you can override this with the `BOOXMARKX_API_PORT` environment variable (or in the `.env` file).

* Create a new file named `.env`, taking the `.env-sample` file as a model:
	```bash
	cp .env-sample .env
	```

* Fill the `.env` file with missing info, if any.

* Install, build and start up the API:
	```bash
	cd back
	npm install --production
	npm run build
	npm run start
	```

The API now listens on http://localhost:8080

## Front-end

> By default, the web app will be served on port `3000`, but you can override this with the `BOOXMARKX_FRONT_PORT` environment variable (or in the `.env` file).

...