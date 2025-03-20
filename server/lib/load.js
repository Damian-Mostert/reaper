const fs = require('fs');
const path = require('path');

function loadModules(dir, obj) {
  fs.readdirSync(dir)
    .filter(name => !name.endsWith("map") && !name.endsWith("css"))
    .forEach(file => {
      const fullPath = path.join(dir, file);
      delete require.cache[require.resolve(fullPath)]; // Clear cache
      obj[file] = require(fullPath).default;
    });
}

function reloadApp() {
  loadModules(path.join(process.cwd(), "./.reaper/out/api/controllers/"), APP.controllers);
  loadModules(path.join(process.cwd(), "./.reaper/out/api/middleware/"), APP.middleware);
  loadModules(path.join(process.cwd(), "./.reaper/out/api/events/"), APP.listeners);
  
  const routesPath = path.join(process.cwd(), "./.reaper/out/routes/index");
  delete require.cache[require.resolve(routesPath)];
  APP.routes = require(routesPath).default;

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
