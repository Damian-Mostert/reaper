const newServer = require("../server/start")
const logger = require('../utils/logger')
logger.startLoading("starting server...")
newServer(null,()=>{
    const port = process.env.SERVER_PORT?process.env.SERVER_PORT : 3000;
    logger.stopLoading(`Server is running on port ${port}`)
})