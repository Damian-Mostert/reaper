import {Middleware } from "reaper-framework";

const authMiddlware:Middleware =async(request,response,next)=>{
    next()
}

export default authMiddlware;