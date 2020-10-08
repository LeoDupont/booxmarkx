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

Create a new file named `.env`, taking the `.env-sample` file as a model. You'll probably need it in the following steps:
```bash
cp .env-sample .env
```

## Database

You need to provide a __MongoDB__ database URI, either to the `.env` file, or as a `BOOXMARKX_MONGODB_URI` environment variable.

If you don't have a MongoDB database ready, here are two ways to get one:

1. [Get a free, personal, remote MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas)

2. __Or__ setup a local database:
	1. [Install MongoDB Community](https://docs.mongodb.com/manual/administration/install-community/)
	2. Start up a local database with `mongod --dbpath=db`.

## Startup

> By default, the API will listen on port `8080` and the web app will be served on port `3000`, but you can overwrite these with the `BOOXMARKX_API_PORT` and `BOOXMARKX_FRONT_PORT` environment variables (or in the `.env` file).

Install dependencies:
```bash
npm install
```

Start back-end server and serve front-end:
```bash
npm run start
```

You can now access the web app on http://localhost:3000