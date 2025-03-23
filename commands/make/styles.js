const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
const logger = require("../../utils/logger");
logger.info(`making new stylesheet "${name}.module.scss"...`);
newMakeScript(name,path.join(__dirname,"./samples/styles.scss"),path.join(process.cwd(),`./app/styles/${name}.module.scss`))
logger.success(`./app/styles/${name}.module.scss has been made.`);