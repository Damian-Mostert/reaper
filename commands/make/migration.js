const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
const filename = `${Date.now()}_${name}.ts`
logger.info(`making new migration "${filename}"`);
newMakeScript(name,path.join(__dirname,"./samples/migration.ts"),path.join(process.cwd(),"./db/migrations/",filename))
logger.success(`./db/migrations/${filename} has been made.`);