import { ReaperRoutes } from "reaper-framework";
export default function ApiRoutes({
    Get,
    Post,
    Middleware,
    Group,
}:ReaperRoutes) {
    Post("login","/login","@userConrtroller.login")
    Middleware("/auth","@authMiddleware",({
        Post,
    }:ReaperRoutes)=>{
        Post("logout","/logout","@userController.logout")
        Post("user","/user","@userController.details")
    })
}
    
