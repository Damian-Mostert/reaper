const path = require("path")
const build = require("../server/build")
build.migrations().then(()=>{
    require(path.join(process.cwd(),"./.reaper/out/migrate/rollback.js")).rollbackMigrations(path.join(process.cwd(),"./.reaper/out/migrations"))
})