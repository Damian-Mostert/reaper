import { ReaperRoutes } from "rprcli";
import ApiRoutes from "./api/index";

export default function MainRoutes({
    Get,
    Post,
    Middleware,
    Group,
    useSocket
}:ReaperRoutes) {
    Group("/api",ApiRoutes)
    ///Pages
    useSocket("testSocket","/test","@testSocket");
    Get("home-page","/","@pagesController.home")
    Get("login-page","/login","@pagesController.login")
    Get("register-page","/register","@pagesController.register");
}
    
