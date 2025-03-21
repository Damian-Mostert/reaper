import { Migration } from "rprcli";
export default Migration("users",{
    up(blueprint){
        blueprint.id()
        //blueprint.auth()
        blueprint.string("firstName")
        blueprint.string("lastName")
        blueprint.string("email")
        blueprint.string("password")
        blueprint.boolean("admin")
        blueprint.timestamps()
    },
    down(blueprint){
        blueprint.dropTable()
    }
})
