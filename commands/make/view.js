const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[2];
newMakeScript(name,path.join(__dirname,"./samples/view.tsx"),path.join(process.cwd(),`./app/views/${name}View.ts`))
newMakeScript(`${name}ViewPropsType`,path.join(__dirname,"./samples/type.ts"),path.join(process.cwd(),`./types/${name}ViewProps.ts`))