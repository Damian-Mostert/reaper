const fs = require("fs");
module.exports = function newMakeScript(name,resource,outputDir){
    const file = fs.readFileSync(resource).toString();
    fs.writeFileSync(outputDir,file.replace(/{{name}}/g,name))
}