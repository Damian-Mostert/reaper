import { ReaperRoutes } from "rprcli";
import ApiRoutes from "./api/index";

export default function MainRoutes({
    Get,
    Post,
    Middleware,
    Group,
}:ReaperRoutes) {
    Group("/api",ApiRoutes)
    ///Pages
    Get("home-page","/","@pagesController.home")
    Get("login-page","/login","@pagesController.login")
    Get("register-page","/register","@pagesController.register");
}
    
