
const WebSocket = require("ws");
const logger = require("../utils/logger");
const port = process.env.PORT?process.env.PORT : 3000;
const routes = require("./routes")
module.exports = function newServer(APP,done=()=>{}) {
    if(!APP)APP = require("./lib/load").APP;
    const app = routes(APP);
    const server = app.listen(port, () => {
        done()   
    });
    const wss = new WebSocket.Server({ noServer: true });
    server.on("upgrade", (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            ws.send("connected");

        });
    });
    const closeWebsockets = ()=>{
        wss.clients.forEach(client => client.terminate()); // Force-close all WebSocket clients
        wss.close();
    }
    return{ server, closeWebsockets };
};
