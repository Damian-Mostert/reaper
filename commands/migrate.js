const path = require("path")
const build = require("../server/build")
build.migrations().then(()=>{
    require(path.join(process.cwd(),"./.reaper/out/migrate/migrate.js")).runMigrations(path.join(process.cwd(),"./.reaper/out/migrations"))
})