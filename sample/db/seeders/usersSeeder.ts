

import { Seeder } from "reaperjs";

const usersSeeder = new Seeder("users",async(query)=>{
    await query.create({
        firstName:"test",
        lastName:"test",
        email:"test@example.com",
        password:'test',
        admin:true,
    })
})

usersSeeder.seed().then(res=>{
    console.info(`usersSeeder is done.`)
});

