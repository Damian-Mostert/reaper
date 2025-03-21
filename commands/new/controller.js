import { writeFileSync } from "fs"
import path from "path"
import logger from "../../utils/logger"

export default function createController(){    
    logger.info("making new controller...");
    log.startLoading()
    const sample = ({table})=>`
import { Controller } from "rprcli";
const ${table}Controller:Controller={
}
export default ${table}Controller;`
    writeFileSync(path.join(__dirname,"../../../../app/api/controllers/",`newController.ts`),sample({table:"new"}))
    logger.success("Done.")
    log.stopLoading();
}
createController()