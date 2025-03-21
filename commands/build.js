const logger = require('../utils/logger')
logger.startLoading("Building...");
async function main(){
    await require("../server/build").server()
    await require("../server/build").client()
    logger.stopLoading("Client and server built.")
}
main()