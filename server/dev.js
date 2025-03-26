const build = require("./build");
const start = require("./start");
const chokidar = require("chokidar");
const { reloadApp } = require("reaperjs/server/lib/load");
const logger = require("../utils/logger")


logger.info("Starting up dev server...");


module.exports = () => {
    const cwd = process.cwd();
    let server = null;
    let sockets = null;
    let buildTimeout = null;
    const DEBOUNCE_DELAY = 500;

    const stopServer = async () => {
        if (server) {
            await new Promise((resolve, reject) => {
                sockets();
                server.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            server = null;
        }
    };

    const restart = async (count = 2) => {
       
        await stopServer();
        try {
            reloadApp();
            await build.client();
            await build.server();
            logger.stopLoading()
            web = start(null,()=>{
                if(count == 2){
                    const port = process.env.SERVER_PORT?process.env.SERVER_PORT : 3000;
                    logger.success(`Server is running on port ${port}`)        
                }        
            });
            server = web.server;
            sockets = web.closeWebsockets;
        } catch (err) {
            logger.error(err);
        }
        if (count > 1) {
            setTimeout(() => restart(count - 1), DEBOUNCE_DELAY);
        }
    };

    // Watch for file changes
    const watcher = chokidar.watch(cwd, {
        ignored: /node_modules|\.git|\.reaper/,
        persistent: true,
    });

    watcher.on("change", (filePath) => {
        reloadApp();
        clearTimeout(buildTimeout);
        
        buildTimeout = setTimeout(() => [logger.startLoading('Building server...'),restart(2)], DEBOUNCE_DELAY); // Restart twice on changes
    });

    restart(2); // Initial start with two restarts
};
