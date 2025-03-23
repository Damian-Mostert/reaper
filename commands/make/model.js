const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new model "${name}Model.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/model.ts"),path.join(process.cwd(),`./db/models/${name}Model.ts`));
newMakeScript(`${name}Model`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}Model.ts`));
logger.success(`./db/models/${name}Model.ts has been made.`);