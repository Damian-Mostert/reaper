import { Migration } from "rprcli";
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
