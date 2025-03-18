//import { Users } from "@db/models/user";
import { Controller } from "reaper-framework";
const userController:Controller={
    async details(request,response){
        const user = await request.user();
        if(user){
            /* const fullUser = await Users.query().where("id","=",user.id).getOne();
            response.json({
                user_details:fullUser
            }); */
        }
    },
    async logout(request,response){

    },
    async login(request,response){

    },
    async register(request,response){

    },
}
export default userController;

