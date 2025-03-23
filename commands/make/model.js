const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/model.ts"),path.join(process.cwd(),`./db/${name}Model.ts`))
newMakeScript(`${name}Model`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}ModelType.ts`))