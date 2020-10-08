import express, { Application } from "express";

export async function setupExpress() {

	const app = express();

	return new Promise((resolve, reject) => {
		const server = app.listen(8080, () => {
			resolve({ app, server });
		});
	})
}
