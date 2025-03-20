const { readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs")
const path = require("path")

module.exports = function writeTemplate({name,view,layout}){
    const fileData = readFileSync(path.join(__dirname,"./template.tsx")).toString()
    .replace(`{{view}}`,view)
    .replace(`{{layout}}`,layout);
    if(!existsSync(path.join(process.cwd(),"./.reaper/temp/views")))
        mkdirSync(path.join(process.cwd(),"./.reaper/temp/views"));
    writeFileSync(path.join(process.cwd(),"./.reaper/temp/views",`./${name}`),fileData);
    return fileData;
}