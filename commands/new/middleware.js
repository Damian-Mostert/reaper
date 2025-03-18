import { writeFileSync } from "fs"
import path from "path"
import logger from "reaper-framework/utils/logger"
export default function createMiddleware(){
    logger.log("loading","making new middleware...");
    const sample = ({table})=>`
import {Middleware } from "reaper-framework";

const ${table}Middlware:Middleware =async(request,response,next)=>{
    next()
}

export default ${table}Middlware;`
    writeFileSync(path.join(__dirname,"../../../../app/api/middleware/",`newMiddleware.ts`),sample({table:"new"}));
    logger.log("success","Done.");
}
createMiddleware()