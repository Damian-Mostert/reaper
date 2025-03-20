import { Controller } from "rprcli";
import { Users } from "../../db/models/user";
import { HomePageProps } from "@ts/homePageProps";
const pageController:Controller={
    async home(request,response){
        response.render<HomePageProps>("home",{
            metadata:{
                title:"Home",
                description:'Home',                
            },
            props:{
                data:"Hello world"
            }
        })
    }
}
export default pageController;