const path = require("path")
const build = require("../server/build")
build.migrations().then(()=>{
    require(path.join(process.cwd(),"./"))
})