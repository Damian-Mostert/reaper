const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new middleware "${name}Middleware.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/middleware.ts"),path.join(process.cwd(),`./api/middleware/${name}Middleware.ts`))
logger.success(`./api/middleware/${name}Middleware.ts has been made.`);