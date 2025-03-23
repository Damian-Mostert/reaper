const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/controller.ts"),path.join(process.cwd(),`./api/controllers/${name}Controller.ts`))