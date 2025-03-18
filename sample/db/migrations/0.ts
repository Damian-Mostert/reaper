import { Migration } from "reaper-framework";
export default Migration("auth-tokens",{
    up(blueprint){
        blueprint.id()
        blueprint.number("userId")
        blueprint.string("token")
        blueprint.boolean("expired")
        blueprint.timestamps()
    },
    down(blueprint){
        blueprint.dropTable()
    }
})
