import { Controller } from "reaperjs";
//import { Users } from "../../db/models/user";
import { HomePageProps } from "@ts/homePageProps";
const pageController:Controller={
    async home(request,response){
        response.render<HomePageProps>("home",{
            metadata:{
                title:"Home",
                description:'Home',                
            },
            props:{
                data:request.params.test
            }
        })
    },
    async test(request,response){
        response.render<HomePageProps>("test",{
            metadata:{
                title:"Test",
                description:'Home',                
            },
            props:{
                data:request.params.test
            }
        })
    }
}
export default pageController;