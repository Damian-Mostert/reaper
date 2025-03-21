import { writeFileSync } from "fs"
import path from "path"
import logger from "reaperjs/utils/logger";

export default function createService(){
logger.log("loading","making new service...");
const sample = ({table})=>`
interface ${table}ServiceProps{

}
export default async function ${table}Service(props:${table}ServiceProps){
    
}`
    writeFileSync(path.join(__dirname,"../../../../app/api/services/",`newService.ts`),sample({table:"new"}))
    logger.log("success","Done.");
}
createService()