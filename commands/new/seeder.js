import { writeFileSync } from "fs"
import path from "path"
import logger from "reaper-framework/utils/logger";

export default function createSeeder(){
logger.log("loading","making new seeder...");
const sample = ({table})=>`
import { Seeder } from "reaper-framework";
const ${table}Seeder = new Seeder("${table}",(q)=>{
})
${table}Seeder.seed().then(res=>{
}).catch(error=>{
}).finally(()=>{
})

`
    writeFileSync(path.join(__dirname,"../../../../app/db/seeders",`newSeeder.ts`),sample({table:"new"}))
    logger.log("success","Done.");
}
createSeeder()