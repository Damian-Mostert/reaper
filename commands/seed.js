const seed = process.argv[2];
const fs = require("fs")
const path = require("path");
const build = require("../server/build")
build.seeders(seed != "{{}}"?seed:"").then(()=>{
    if(seed != "{{}}"){
        require(path.join(process.cwd(),".reaper/out/seeders/",`${seed}.js`))
    }else{
        const seeders = fs.readdirSync(path.join(process.cwd(),".reaper/out/seeders/"));
        for(let seeder of seeders.filter(name=>name.endsWith(".js"))){
            require(path.join(process.cwd(),".reaper/out/seeders/",seeder))
        }
    } 
})