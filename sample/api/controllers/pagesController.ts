import { Controller } from "rprcli";
import { Users } from "../../db/models/user";
const pageController:Controller={
    async home(request,response){
        response.render("home",{
            metadata:{
                title:"Home",
                description:'Home',
            },
            props:{
                user:(await Users.query().where("id","=","2").get())[0]
            }
        })
    },
    async login(request,response){
        response.render("login",{
            metadata:{
                title:"Home",
                description:'Home',
            },
            props:{...request.data}
        })
    },
    async register(request,response){
        response.render("register",{
            metadata:{
                title:"Home",
                description:'Home',
            },
            props:{...request.data}
        })
    },
    async forgotPassword(request,response){
        response.render("forgotPassword",{
            metadata:{
                title:"Home",
                description:'Home',
            },
            props:{...request.data}
        })
    },
    async portal(request,response){
        response.render("portal",{
            metadata:{
                title:"Home",
                description:'Home',
            },
            props:{...request.data}
        })
    },
}
export default pageController;