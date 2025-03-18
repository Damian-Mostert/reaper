import { writeFileSync } from "fs"
import path from "path"
import logger from "reaper-framework/utils/logger";

export default function createModel(){
logger.log("loading","making new model...");
const sample = ({table})=>`
import { Model } from "reaper-framework";
export const ${table}Model  = new Model("${table}",{
    private:[],
    format(res){
        return res
    }
});`
    writeFileSync(path.join(__dirname,"../../../../app/db/models",`newModel.ts`),sample({table:"new"}))
    logger.log("success","Done.");
}
createModel()