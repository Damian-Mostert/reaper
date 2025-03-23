const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/service.ts"),path.join(process.cwd(),`./api/services/${name}Service.ts`))