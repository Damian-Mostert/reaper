import {Middleware } from "rprcli";

const authMiddlware:Middleware =async(request,response,next)=>{
    next()
}

export default authMiddlware;