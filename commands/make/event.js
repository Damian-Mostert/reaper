const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new event "${name}Event.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/event.ts"),path.join(process.cwd(),`./api/events/${name}Event.ts`))
newMakeScript(`${name}Event`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}Event.ts`))
logger.success(`./api/events/${name}Event.ts has been made.`);