
# REAPER FRAMEWORK
A ts based backend framework that supports front end React.js template rendering
### Usage
to start up use:
```sh
npm i reaper-framework
npx reaper-framework init
```
## Project structure
```plain
- app
    - api
        - controllers
        - middleware
        - services
    - db 
        - migrations
        - models
        - seeders
    - routes
    - styles
    - templates
- public
    reaper.webp
- .env
- package-lock.json
- 
```
## Commands
```sh
npx reaper-framework new:controller #TO RUN SEEDERS
npx reaper-framework new:middleware #TO RUN SEEDERS
npx reaper-framework new:migration #TO RUN SEEDERS
npx reaper-framework new:model #TO RUN SEEDERS
npx reaper-framework new:seeder #TO RUN SEEDERS
npx reaper-framework new:service #TO RUN SEEDERS
npx reaper-framework new:styles #TO RUN SEEDERS
npx reaper-framework new:template #TO RUN SEEDERS
npx reaper-framework help #FOR HELP
npx reaper-framework seed #TO RUN SEEDERS
npx reaper-framework migrate #TO RUN SEEDERS
npx reaper-framework rollback #TO RUN SEEDERS
npx reaper-framework init #TO RUN SEEDERS
npx reaper-framework dev #TO RUN SEEDERS
npx reaper-framework build #TO RUN SEEDERS
npx reaper-framework serve #TO RUN SEEDERS
```
## Routing
##### Example
/app/routes/index.ts
```ts
import { ReaperRoutes } from "reaper-framework";
import ApiRoutes from "./api/index";

export default function MainRoutes({
    Get,
    Post,
    Middleware,
    Group,
}:ReaperRoutes) {
    Group("/api",ApiRoutes)
    ///Pages
    Get("home-page","/","@pagesController:home")
    Get("login-page","/login","@pagesController:login")
    Get("register-page","/register","@pagesController:register");
}
    

```
