const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/event.ts"),path.join(process.cwd(),`./db/models/${name}Model.ts`))
newMakeScript(`${name}Event`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}Event.ts`))