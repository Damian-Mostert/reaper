const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[3];
newMakeScript(name,path.join(__dirname,"./samples/middleware.ts"),path.join(process.cwd(),`./api/middleware/${name}Middleware.ts`))