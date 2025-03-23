const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[3];
newMakeScript(name,path.join(__dirname,"./samples/styles.scss"),path.join(process.cwd(),`./app/styles/${name}.module.scss`))