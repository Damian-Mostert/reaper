const { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } = require("fs")
const path = require("path")

module.exports = function writeTemplate({name,view,layout}){
    const fileData = readFileSync(path.join(__dirname,"./template.jsx")).toString()
    .replace(`{{view}}`,view)
    .replace(`{{layout}}`,layout);

    const outFilename = path.join(process.cwd(),"./.reaper/temp/views",`./${name}`);
    writeFileSync(outFilename.endsWith(".tsx") ?outFilename.replace(".tsx",".jsx") : outFilename.endsWith(".jsx")?outFilename:`${outFilename}.jsx`,fileData);    
    return fileData;
}

module.exports.clear = function clearTemplate(){
    if(!existsSync(path.join(process.cwd(),"./.reaper")))
        mkdirSync(path.join(process.cwd(),"./.reaper"));
    if(!existsSync(path.join(process.cwd(),"./.reaper/temp")))
        mkdirSync(path.join(process.cwd(),"./.reaper/temp"));
    if(existsSync(path.join(process.cwd(),"./.reaper/temp/views"))){
        rmSync(path.join(process.cwd(),"./.reaper/temp/views"),{recursive:true})
        mkdirSync(path.join(process.cwd(),"./.reaper/temp/views"));
    }else mkdirSync(path.join(process.cwd(),"./.reaper/temp/views"));
}