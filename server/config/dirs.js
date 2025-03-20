const path = require("path")

const controllerDir = path.join(process.cwd(), "./api/controllers");
const middlewareDir = path.join(process.cwd(), "./api/middleware");
const listenersDir = path.join(process.cwd(), "./api/events");
const routesDir = path.join(process.cwd(), "./routes");
const appDir = path.join(process.cwd(), "./app");
const seedersDir = path.join(process.cwd(), "./db/seeders");
const migrationsDir = path.join(process.cwd(), "./db/migrations");
const modelsDir = path.join(process.cwd(), "./db/models");
const servicesDir = path.join(process.cwd(), "./api/services");
const mainFile = path.join(process.cwd(), "./index.ejs");

module.exports = {
    controllerDir,
    middlewareDir,
    routesDir,
    appDir,
    migrationsDir,
    modelsDir,
    seedersDir,
    servicesDir,
    mainFile,
    listenersDir
}