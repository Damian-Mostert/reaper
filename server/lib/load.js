const fs = require('fs');
const path = require('path');
const logger  = require("../../utils/logger")
function loadModules(dir, obj) {
  fs.readdirSync(dir)
    .filter(name => !name.endsWith("map") && !name.endsWith("css"))
    .forEach(file => {
      const fullPath = path.join(dir, file);
      
      try {
        // Clear the cache to ensure the latest version is loaded
        delete require.cache[require.resolve(fullPath)];
        
        // Require the file and store it in the object
        obj[file] = require(fullPath).default;
      } catch (error) {
        // Log error with the file that failed to load
        logger.error(`Error loading module: ${fullPath}`);
        console.error(error);
      }
    });
}

function reloadApp() {
  loadModules(path.join(process.cwd(), "./.reaper/out/api/controllers/"), APP.controllers);
  loadModules(path.join(process.cwd(), "./.reaper/out/api/middleware/"), APP.middleware);
  
  const routesPath = path.join(process.cwd(), "./.reaper/out/routes/index");
  delete require.cache[require.resolve(routesPath)];
  try{
    APP.routes = require(routesPath).default;
  }catch(e){
    logger.error(`Error loading routes in ${routesPath}`);
    logger.error(e);
  }

  APP.templates = fs.readdirSync(path.join(process.cwd(), "./app/views"))
    .map(file => file.replace(/\.(tsx|ts|jsx|js)$/, ""));
}

const APP = {
  controllers: {},
  middleware: {},
  listeners: {},
  routes: null,
  templates: []
};

reloadApp(); // Initial load

module.exports = { APP, reloadApp };
