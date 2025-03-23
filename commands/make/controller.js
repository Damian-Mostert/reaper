const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new controller "${name}Controller.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/controller.ts"),path.join(process.cwd(),`./api/controllers/${name}Controller.ts`))
logger.success(`./api/controllers/${name}Controller.ts has been made.`);