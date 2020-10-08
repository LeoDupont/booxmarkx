import "reflect-metadata";
import { loadApp } from "./loaders";

async function init() {
	await loadApp();
}

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

init();
