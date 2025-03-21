import { ReaperRoutes } from "reaperjs";
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
    Get("test-page","/test/[...any]","@pagesController.test")

    Get("login-page","/login","@pagesController.login")
    Get("register-page","/register","@pagesController.register");
}
    
