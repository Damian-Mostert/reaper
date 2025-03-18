
import { Seeder } from "rprcli";

const userSeeder = new Seeder("users",(q)=>{
    
    q.create({
        firstName:"test",
        lastName:"test",
        email:"test@example.com",
        password:'test',
        admin:true,
    }).then(res=>{
        console.log("root admin created")
    });
})

userSeeder.seed().then(res=>{

}).catch(error=>{

}).finally(()=>{

})

