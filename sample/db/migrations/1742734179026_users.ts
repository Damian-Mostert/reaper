import { Migration } from "reaperjs";
export default Migration("users",{
    up(blueprint){
        blueprint.id()
        blueprint.string("firstName").notNullable()
        blueprint.string("lastName").notNullable()
        blueprint.string("email").notNullable()
        blueprint.string("password").notNullable()
        blueprint.boolean("admin").nullable()
        blueprint.timestamps()
    },
    down(blueprint){
        blueprint.dropTable()
    }
})
