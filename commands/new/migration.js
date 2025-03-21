import { writeFileSync } from "fs"
import path from "path"
import logger from "../../utils/logger"
export default function createMigration(){
    logger.info("making new migration...");
    logger.startLoading();
    const sample = ({table})=>`
import { Migration } from "rprcli/db";
export default Migration("${table}",{
    up(blueprint){
    },
    down(blueprint){
    }
});`
writeFileSync(path.join(__dirname,"../../../../app/db/migrations/",`${Date.now()}.ts`),sample({table:"table_name"}))
logger.stopLoading();
logger.success("Done.");
}

createMigration()