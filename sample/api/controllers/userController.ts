//import { Users } from "@db/models/user";
import { Controller } from "reaperjs";
const userController:Controller={
    details:async(request,response)=>{
        const user = await request.user();
        if(user){
            /* const fullUser = await Users.query().where("id","=",user.id).getOne();
            response.json({
                user_details:fullUser
            }); */
        }
    },
    async logout(request,response){
//        request.user.logout();

    },
    async login(request,response){
        response.json({amount:10})
//        request.user.login();

    },
    async register(request,response){

    },
}
export default userController;

