const seed = process.argv[2];
const fs = require("fs")
const path = require("path");
const build = require("../server/build");
const logger = require("../utils/logger");
logger.startLoading(seed!="{{}}"?`Running seeder ${seed}`:"Running all seeders...");
build.seeders(seed != "{{}}"?seed:"").then(()=>{
    if(seed != "{{}}"){
        require(path.join(process.cwd(),".reaper/out/seeders/",`${seed}.js`));
        logger.stopLoading("Seeder has been compiled and executed been executed!");
    }else{
        const seeders = fs.readdirSync(path.join(process.cwd(),".reaper/out/seeders/"));
        logger.stopLoading(`Seeders compiled: [${seeders.filter(name=>name.endsWith(".js")).join(", ")}]`);
        for(let seeder of seeders.filter(name=>name.endsWith(".js"))){           
            require(path.join(process.cwd(),".reaper/out/seeders/",seeder))
            logger.stopLoading(`Seeder ${seeder} has been executed!`);
        }
    } 
})