const { createServer } = require("@vercel/node"); 
const routes = require("./routes")
module.exports = createServer(routes);