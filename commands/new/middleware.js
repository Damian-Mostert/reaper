import { writeFileSync } from "fs"
import path from "path"
import logger from "../../utils/logger"
export default function createMiddleware(){
    logger.info("making new middleware...");
    log.startLoading()
    const sample = ({table})=>`
import {Middleware } from "reaperjs";

const ${table}Middlware:Middleware =async(request,response,next)=>{
    next()
}

export default ${table}Middlware;`
    writeFileSync(path.join(__dirname,"../../../../app/api/middleware/",`newMiddleware.ts`),sample({table:"new"}));
    logger.stopLoading()
    logger.log("success","Done.");
}
createMiddleware()