const routes = require("./routes")
export default function(req,res,next){
    routes(req,res,next);
}