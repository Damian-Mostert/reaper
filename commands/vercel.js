const build = require("../server/build")
build.vercel().then(()=>{
    console.log("vercel files built.")
})