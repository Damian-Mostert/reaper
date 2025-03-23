const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new view "${name}View.tsx"...`);
newMakeScript(name,path.join(__dirname,"./samples/view.tsx"),path.join(process.cwd(),`./app/views/${name}View.tsx`))
newMakeScript(`${name}ViewProps`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}ViewProps.ts`))
logger.success(`./types/${name}ViewProps.ts has been made.`);