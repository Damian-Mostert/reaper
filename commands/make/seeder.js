const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new seeder "${name}Seeder.ts"...`);
newMakeScript(name,path.join(__dirname,"./samples/seeder.ts"),path.join(process.cwd(),`./db/seeders/${name}Seeder.ts`))
logger.success(`./db/seeders/${name}Seeder.ts has been made.`);
