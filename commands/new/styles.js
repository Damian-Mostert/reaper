import { writeFileSync } from "fs"
import path from "path"
import logger from "reaperjs/utils/logger";

export default function createService(){
logger.log("loading","making new css sheet...");
const sampleTableMigration = ({table})=>``
    writeFileSync(path.join(__dirname,"../../../../app/styles",`new.module.css`),sampleTableMigration({table:"new"}))
    logger.log("success","Done.");
}
createService()