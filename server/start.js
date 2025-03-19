const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const logger = require("../utils/logger");

module.exports = function newServer() {
    const app = express();
    const port = 3000;
    logger.log("loading", "Starting server...");
    const loadRoutes = require("rprcli/server/lib/loadRoutes");
    const APP = require("rprcli/server/lib/load");
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(loadRoutes(APP));
    app.use(express.static(path.join(process.cwd(), ".reaper/out/templates")));
    app.use(express.static(path.join(__dirname, "./public")));
    app.use(express.static(path.join(process.cwd(), "public")));
    const server = app.listen(port, () => {
        logger.log("success", `Server is running on http://localhost:${port}.`);
    });
    const wss = new WebSocket.Server({ noServer: true });
    server.on("upgrade", (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            ws.send("connected");

        });
    });
    // Gracefully close WebSocket server when the HTTP server is closed
    server.on("close", () => {
        logger.log("info", "Server and WebSockets closed.");
    });

    const closeWebsockets = ()=>{
        wss.clients.forEach(client => client.terminate()); // Force-close all WebSocket clients
        wss.close();
    }

    return{ server, closeWebsockets };
};
