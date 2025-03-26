const build = require("./build");
const start = require("./start");
const chokidar = require("chokidar");
const { reloadApp } = require("reaperjs/server/lib/load");
const logger = require("../utils/logger");

const DEBOUNCE_DELAY = 500;
let server = null;
let sockets = null;
let buildTimeout = null;
let hasStarted = false;

const restartServer = async () => {
  try {
    // Stop the existing server if running
    if (server) {
      sockets(); // Close websockets
      await new Promise((resolve, reject) => {
        server.close((err) => err ? reject(err) : resolve());
      });
      server = null;
    }

    logger.startLoading("Building server...");
    logger.startBuildTimer();
    await build.client();
    await build.server();
    reloadApp();

    // End the timer once the build is done
    logger.stopBuildTimer();

    // Start the server and capture the server and websocket handlers
    const web = start(null, () => {});
    server = web.server;
    sockets = web.closeWebsockets;

    const port = process.env.SERVER_PORT || 3000;

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

const initDevServer = () => {
  logger.info("Starting up dev server...");
  restartServer(); // Initial server start
  startFileWatcher(); // Watch for file changes and rebuild as necessary
};

module.exports = initDevServer;
