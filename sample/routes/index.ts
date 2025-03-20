import { ReaperRoutes } from "rprcli";
import ApiRoutes from "./api";

export default function MainRoutes({
    Get,
    Post,
    Middleware,
    Group,
}:ReaperRoutes) {
    //api's
    Group("/api",ApiRoutes)
    ///pages
    Get("home-page","/","@pagesController.home")
    Get("login-page","/login","@pagesController.login")
    Get("register-page","/register","@pagesController.register");
}
    
