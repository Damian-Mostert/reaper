import { ReaperRoutes } from "reaperjs";
export default function ApiRoutes({
    Get,
    Post,
    Middleware,
    Group,
}:ReaperRoutes) {
    Post("test","/login","@userController.login")
    Middleware("/auth","@authMiddleware",({
        Post,
    }:ReaperRoutes)=>{
        Post("logout","/logout","@userController.logout")
        Post("user","/user","@userController.details")
    })
}
    
