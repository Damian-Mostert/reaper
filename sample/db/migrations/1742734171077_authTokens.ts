import { Migration } from "reaperjs";
export default Migration("authTokens",{
    up(blueprint){
        blueprint.id()
        blueprint.number("userId").notNullable()
        blueprint.string("token").notNullable()
        blueprint.boolean("expired").notNullable()
        blueprint.timestamps()
    },
    down(blueprint){
        blueprint.dropTable()
    }
})
