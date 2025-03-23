import { Migration } from "reaperjs";
export default Migration("authTokens",{
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
