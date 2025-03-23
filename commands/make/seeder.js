const path = require("path");
const newMakeScript = require("./lib/newMakeScript");
const name = process.argv[3];
newMakeScript(name,path.join(__dirname,"./samples/seeder.ts"),path.join(process.cwd(),`./db/seeders/${name}Seeder.ts`))