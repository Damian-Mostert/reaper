import { writeFileSync } from "fs"
import path from "path"
import logger from "reaper-framework/utils/logger";
export default function createMigration(){
    logger.log("loading","making new migration...");
    const sample = ({table})=>`
import { Migration } from "reaper-framework/db";
export default Migration("${table}",{
    up(blueprint){
    },
    down(blueprint){
    }
});`
writeFileSync(path.join(__dirname,"../../../../app/db/migrations/",`${Date.now()}.ts`),sample({table:"table_name"}))
logger.log("success","Done.");
}

createMigration()