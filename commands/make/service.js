const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new service "${name}Service.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/service.ts"),path.join(process.cwd(),`./api/services/${name}Service.ts`))
newMakeScript(`${name}ServiceProps`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}ServiceProps.ts`))
logger.success(`./api/services/${name}Service.ts has been made.`);