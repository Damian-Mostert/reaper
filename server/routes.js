const logger = require("../utils/logger")
const express = require("express");
const path = require("path");
const app = express();
logger.log("loading", "Starting server...");
const loadRoutes = require("rprcli/server/lib/loadRoutes");
const APP = require("rprcli/server/lib/load");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(loadRoutes(APP));
app.use("/__reaper_generated",express.static(path.join(process.cwd(), ".reaper/out/templates")));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(process.cwd(), "public")));
module.exports = app