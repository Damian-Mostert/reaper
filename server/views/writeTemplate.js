const { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } = require("fs")
const path = require("path")

module.exports = function writeTemplate({name,view,layout}){
    const fileData = readFileSync(path.join(__dirname,"./template.tsx")).toString()
    .replace(`{{view}}`,view)
    .replace(`{{layout}}`,layout);
    if(!existsSync(path.join(process.cwd(),"./.reaper")))
        mkdirSync(path.join(process.cwd(),"./.reaper"));
    if(!existsSync(path.join(process.cwd(),"./.reaper/temp")))
        mkdirSync(path.join(process.cwd(),"./.reaper/temp"));
    if(existsSync(path.join(process.cwd(),"./.reaper/temp/views"))){
        rmSync(path.join(process.cwd(),"./.reaper/temp/views"),{recursive:true})
        mkdirSync(path.join(process.cwd(),"./.reaper/temp/views"));
    }else mkdirSync(path.join(process.cwd(),"./.reaper/temp/views"));
    writeFileSync(path.join(process.cwd(),"./.reaper/temp/views",`./${name}`),fileData);
    return fileData;
}