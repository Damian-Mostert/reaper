const express = require("express");
const path = require("path");
const ejs = require("ejs")
const app = express();
const loadRoutes = require("rprcli/server/lib/loadRoutes");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/__reaper_generated",express.static(path.join(process.cwd(), ".reaper/out/templates")));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(process.cwd(), "public")));
module.exports = (APP)=>{
    app.use(loadRoutes(APP));
    return app;    
};
//force ejs to be included
module.exports.ejs = ejs;