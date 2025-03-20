
const fs = require('fs');
const path = require('path');
const controllers = {};
fs.readdirSync(path.join(process.cwd(),"./.reaper/out/api/controllers/")).filter(name=>!name.endsWith("map")&&!name.endsWith("css")).forEach(controller=>{
  controllers[controller]=require(path.join(process.cwd(),"./.reaper/out/api/controllers/",controller)).default;
})
const middleware = {};
fs.readdirSync(path.join(process.cwd(),"./.reaper/out/api/middleware/",)).filter(name=>!name.endsWith("map")&&!name.endsWith("css")).forEach(controller=>{
  controllers[controller]= require(path.join(process.cwd(),"./.reaper/out/api/middleware/",controller)).default
})
const listeners = {};
fs.readdirSync(path.join(process.cwd(),"./.reaper/out/api/events/",)).filter(name=>!name.endsWith("map")&&!name.endsWith("css")).forEach(controller=>{
  listeners[controller]= require(path.join(process.cwd(),"./.reaper/out/api/events/",controller)).default
})

const APP = {
  routes:require(path.join(process.cwd(),"./.reaper/out/routes/index")).default,
  controllers,
  listeners,
  middleware,
  templates:fs.readdirSync(path.join(process.cwd(),"./app/views")).map(file=>file.replace(".tsx","").replace(".ts","").replace(".jsx","").replace(".js",""))
};
module.exports = APP;