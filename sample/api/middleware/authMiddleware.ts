import { Middleware } from "reaperjs";

const authMiddlware:Middleware =async(request,response,next)=>{
    next()
}

export default authMiddlware;