import { writeFileSync } from "fs"
import path from "path"
import logger from "rprcli/utils/logger"

export default function createController(){
    logger.log("loading","making new controller...");
    const sample = ({table})=>`
import { Controller } from "rprcli";
const ${table}Controller:Controller={
}
export default ${table}Controller;`
    writeFileSync(path.join(__dirname,"../../../../app/api/controllers/",`newController.ts`),sample({table:"new"}))
    logger.log("success","Done.");
}
createController()