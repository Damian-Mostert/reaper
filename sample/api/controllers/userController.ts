//import { Users } from "@db/models/user";
import { Controller } from "reaperjs";
const userController:Controller<"details"|"login"|"logout"|"register">={
    async details(request,response){
        const user = await request.user();
        if(user){
        }
    },
    async logout(request,response){

    },
    async login(request,response){
        response.json({amount:10})
    },
    async register(request,response){

    },
}
export default userController;

