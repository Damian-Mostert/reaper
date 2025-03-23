const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/model.ts"),path.join(process.cwd(),`./app/db/${name}Model.ts`))