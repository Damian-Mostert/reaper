const build = require("./build");
const chokidar = require("chokidar");
const logger = require("../utils/logger");

const DEBOUNCE_DELAY = 500;
let server = null;
let buildTimeout = null;
let hasStarted = false;

const restartServer = async () => {
    logger.startLoading("Building server...");
    logger.startBuildTimer();
    await build.client();
    await build.server();
	const start = require("./start");
	const { reloadApp } = require("reaperjs/server/lib/load");
    reloadApp();
	try {
		if (server) {
			await new Promise((resolve, reject) => {
				server.close((err) => err ? reject(err) : resolve());
			});
			server = null;
		}
		const web = start(null, () => {});
		server = web.server;
		sockets = web.closeWebsockets;
		const port = process.env.SERVER_PORT || 3000; 
		logger.stopBuildTimer();
		if (!hasStarted) {
			logger.info(`Server is running on port ${port}`);
			hasStarted = true;
		} else {
			logger.info(`Server is running on port ${port}`);
		}
	} catch (err) {
		logger.error(`Error while restarting the server: ${err.message}`);
	}
};

const startFileWatcher = () => {
	const watcher = chokidar.watch(process.cwd(), {
		ignored: /node_modules|\.git|\.reaper/,
		persistent: true,
	});

	watcher.on("change", (filePath) => {
		clearTimeout(buildTimeout);
		buildTimeout = setTimeout(() => {
			logger.startLoading("Rebuilding server after file change...");
			restartServer();
		}, DEBOUNCE_DELAY);
	});
};

const initDevServer = async() => {
	logger.info("Starting up dev server...");
	restartServer(); // Initial server start
	startFileWatcher(); // Watch for file changes and rebuild as necessary
};

module.exports = initDevServer;
