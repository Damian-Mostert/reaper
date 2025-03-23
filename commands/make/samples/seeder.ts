

import { Seeder } from "reaperjs";

const {{name}}Seeder = new Seeder("{{name}}",async(query)=>{
    await query.create({
    })
})

{{name}}Seeder.seed().then(res=>{
    console.info(`{{name}}Seeder is done.`)
});

