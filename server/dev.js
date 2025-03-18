const build = require("./build");
const start = require("./start");
const chokidar = require("chokidar");

module.exports = () => {
    const cwd = process.cwd();
    let server = null;
    let sockets = null;
    let buildTimeout = null;
    const DEBOUNCE_DELAY = 500;

    const restart = async () => {
        if (server) {
            await new Promise((resolve, reject) => {
                sockets()
                server.close((err) => {
                    if (err) {
                        console.error("Error stopping server:", err);
                        reject(err);
                    } else {
                        console.log("Server stopped.");
                        resolve();
                    }
                });
            });
            server = null;
        }

        try {
            console.log("Rebuilding...");
            await build.client();
            await build.server();
            console.log("Restarting server...");
            web = start();
            server = web.server;
            sockets = web.closeWebsockets
        } catch (err) {
            console.error("Error restarting:", err);
        }
    };

    // Watch for file changes
    const watcher = chokidar.watch(cwd, {
        ignored: /node_modules|\.git|\.reaper/,
        persistent: true,
    });

    watcher.on("change", (filePath) => {
        clearTimeout(buildTimeout);
        buildTimeout = setTimeout(restart, DEBOUNCE_DELAY);
    });

    restart(); // Initial start
};
