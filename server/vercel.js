const { createServer } = require("@vercel/node"); 
const routes = require("rprcli/server/routes")
module.exports = createServer(routes);